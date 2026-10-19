import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const productsPath = path.join(root, "src/data/products.json");
const categoriesPath = path.join(root, "src/data/categories.json");
const sitePath = path.join(root, "src/data/site.json");

const errors = [];

function loadJson(label, filePath) {
  if (!existsSync(filePath)) {
    errors.push(`[${label}] Không tìm thấy file: ${filePath}`);
    return null;
  }
  const raw = readFileSync(filePath, "utf-8");
  try {
    return JSON.parse(raw);
  } catch (e) {
    errors.push(`[${label}] Lỗi cú pháp JSON: ${e.message}`);
    return null;
  }
}

const products = loadJson("products.json", productsPath);
const categories = loadJson("categories.json", categoriesPath);
const site = loadJson("site.json", sitePath);

if (products === null || categories === null || site === null) {
  printAndExit();
}

if (!Array.isArray(products)) {
  errors.push("[products.json] Nội dung phải là một mảng (array).");
}
if (!Array.isArray(categories)) {
  errors.push("[categories.json] Nội dung phải là một mảng (array).");
}

if (Array.isArray(categories)) {
  const catIds = new Set();
  categories.forEach((cat, idx) => {
    if (!cat.id) errors.push(`[categories.json] Mục #${idx} thiếu "id".`);
    else if (catIds.has(cat.id))
      errors.push(`[categories.json] "id" bị lặp lại: ${cat.id}`);
    else catIds.add(cat.id);
    if (!cat.name) errors.push(`[categories.json] id="${cat.id}" thiếu "name".`);
    if (typeof cat.active !== "boolean")
      errors.push(`[categories.json] id="${cat.id}" thiếu hoặc sai kiểu "active" (phải là boolean).`);
  });
}

const categoryIds = Array.isArray(categories)
  ? new Set(categories.map((c) => c.id))
  : new Set();

if (Array.isArray(products)) {
  const ids = new Set();
  const slugs = new Set();

  products.forEach((p, idx) => {
    const ref = p.id || `#${idx}`;

    if (!p.id) errors.push(`[products.json] Sản phẩm tại vị trí ${idx} thiếu "id".`);
    else if (ids.has(p.id)) errors.push(`[products.json] id="${p.id}" bị lặp lại.`);
    else ids.add(p.id);

    if (!p.slug) errors.push(`[products.json] id="${ref}" thiếu "slug".`);
    else if (slugs.has(p.slug))
      errors.push(`[products.json] id="${ref}" có slug bị lặp lại: "${p.slug}".`);
    else slugs.add(p.slug);

    if (!p.sku) errors.push(`[products.json] id="${ref}" thiếu "sku".`);
    if (!p.name) errors.push(`[products.json] id="${ref}" thiếu "name".`);

    if (!p.category) {
      errors.push(`[products.json] id="${ref}" thiếu "category".`);
    } else if (!categoryIds.has(p.category)) {
      errors.push(
        `[products.json] id="${ref}" có "category"="${p.category}" không tồn tại trong categories.json.`
      );
    }

    if (p.priceType !== "fixed" && p.priceType !== "quote") {
      errors.push(
        `[products.json] id="${ref}" có "priceType" không hợp lệ: "${p.priceType}" (chỉ nhận "fixed" hoặc "quote").`
      );
    }

    if (p.priceType === "fixed") {
      if (typeof p.price !== "number" || Number.isNaN(p.price) || p.price < 0) {
        errors.push(
          `[products.json] id="${ref}" có priceType="fixed" nhưng "price" không hợp lệ (phải là số >= 0).`
        );
      }
    } else if (p.priceType === "quote") {
      if (p.price !== undefined && p.price !== null) {
        errors.push(
          `[products.json] id="${ref}" có priceType="quote" nhưng vẫn khai báo "price" — sản phẩm báo giá không được có số giá.`
        );
      }
    }

    if (p.currency !== "VND") {
      errors.push(`[products.json] id="${ref}" có "currency" phải là "VND".`);
    }

    if (typeof p.active !== "boolean") {
      errors.push(`[products.json] id="${ref}" thiếu hoặc sai kiểu "active" (phải là boolean).`);
    }

    if (typeof p.featured !== "boolean") {
      errors.push(`[products.json] id="${ref}" thiếu hoặc sai kiểu "featured" (phải là boolean).`);
    }

    if (!Array.isArray(p.material)) {
      errors.push(`[products.json] id="${ref}" thiếu hoặc sai kiểu "material" (phải là mảng).`);
    }

    if (!Array.isArray(p.colors)) {
      errors.push(`[products.json] id="${ref}" thiếu hoặc sai kiểu "colors" (phải là mảng).`);
    }

    if (!p.description) {
      errors.push(`[products.json] id="${ref}" thiếu "description".`);
    }

    if (!Array.isArray(p.images) || p.images.length === 0) {
      errors.push(`[products.json] id="${ref}" thiếu "images" hoặc mảng ảnh trống.`);
    } else {
      p.images.forEach((imgPath) => {
        const normalized = imgPath.startsWith("/") ? imgPath.slice(1) : imgPath;
        const fullPath = path.join(root, "public", normalized);
        if (!existsSync(fullPath)) {
          errors.push(
            `[products.json] id="${ref}" tham chiếu ảnh không tồn tại: "${imgPath}" (đã tìm tại ${fullPath}).`
          );
        }
      });
    }
  });
}

function isValidUrl(value) {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

if (site && typeof site === "object") {
  const requiredFields = [
    "brandName",
    "tagline",
    "heroTitle",
    "heroDescription",
    "logoPath",
    "heroImage",
    "phone",
    "zaloUrl",
    "facebookUrl",
    "contactLabel",
    "footerText",
  ];
  requiredFields.forEach((field) => {
    if (!site[field]) errors.push(`[site.json] Thiếu trường "${field}".`);
  });

  if (site.zaloUrl && !isValidUrl(site.zaloUrl)) {
    errors.push(`[site.json] "zaloUrl" không phải là URL hợp lệ: "${site.zaloUrl}".`);
  }
  if (site.facebookUrl && !isValidUrl(site.facebookUrl)) {
    errors.push(`[site.json] "facebookUrl" không phải là URL hợp lệ: "${site.facebookUrl}".`);
  }
}

printAndExit();

function printAndExit() {
  if (errors.length > 0) {
    console.error(`Validate dữ liệu KAM 3D Studio: THẤT BẠI (${errors.length} lỗi)\n`);
    errors.forEach((e) => console.error(" - " + e));
    process.exit(1);
  } else {
    console.log("Validate dữ liệu KAM 3D Studio: THÀNH CÔNG - không có lỗi.");
    process.exit(0);
  }
}
