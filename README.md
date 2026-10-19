# KAM 3D Studio - Website Catalog Sản Phẩm

Website giới thiệu sản phẩm (catalog) tĩnh cho KAM 3D Studio - cửa hàng in 3D (clicker, móc khóa, đồ chơi, sản phẩm cá nhân hóa).

Đây là website **hoàn toàn tĩnh**: không có backend, không database, không đăng nhập, không giỏ hàng, không thanh toán online. Khách xem sản phẩm rồi liên hệ qua Zalo/Facebook/điện thoại để đặt hàng và thỏa thuận giá.

## ⚠️ Thông tin cần thay thế (placeholder)

Trước khi đưa website ra công khai, bạn **phải** thay các thông tin sau trong `src/data/site.json`:

- `phone`: hiện là số giả `0900 000 000` — đổi thành số điện thoại thật.
- `zaloUrl`: hiện là link giả `https://zalo.me/0900000000` — đổi thành link Zalo thật.
- `facebookUrl`: hiện là link giả `https://facebook.com/kam3dstudio` — đổi thành trang Facebook thật.

Tất cả hình ảnh trong `public/images/` (logo, banner, ảnh sản phẩm) đều là **ảnh placeholder dạng SVG màu đơn giản**, chưa phải ảnh thật. Hãy thay bằng ảnh chụp sản phẩm thật của bạn (xem hướng dẫn bên dưới).

## Công nghệ sử dụng

- React + Vite (JavaScript, không TypeScript)
- CSS thuần, responsive, mobile-first
- Dữ liệu lưu trong file JSON (`src/data/`) — không cần database

## Cài đặt và chạy thử trên máy

```bash
npm install
npm run dev
```

Mở trình duyệt tại địa chỉ hiện trong terminal (thường là `http://localhost:5173`).

## Kiểm tra dữ liệu (validate)

Trước khi build, nên chạy kiểm tra dữ liệu để phát hiện lỗi (thiếu trường, ảnh không tồn tại, category không hợp lệ...):

```bash
npm run validate
```

Nếu có lỗi, script sẽ in rõ file và trường bị lỗi, và dừng lại (không tự sửa). Hãy sửa dữ liệu trong `src/data/*.json` rồi chạy lại.

## Build cho production

```bash
npm run build
```

Kết quả nằm trong thư mục `dist/`. Có thể xem thử bằng:

```bash
npm run preview
```

## Hướng dẫn thêm/sửa dữ liệu

Tất cả dữ liệu nằm trong 3 file:

- `src/data/products.json` — danh sách sản phẩm
- `src/data/categories.json` — danh mục sản phẩm
- `src/data/site.json` — thông tin cửa hàng (tên, slogan, liên hệ...)

### Thêm sản phẩm mới

Mở `src/data/products.json`, thêm một object mới vào mảng, ví dụ:

```json
{
  "id": "p010",
  "name": "Tên sản phẩm",
  "slug": "ten-san-pham-khong-dau",
  "sku": "ABC-010",
  "category": "clicker-mocka",
  "price": 50000,
  "currency": "VND",
  "priceType": "fixed",
  "description": "Mô tả sản phẩm.",
  "material": ["PLA"],
  "colors": ["Trắng", "Đen"],
  "images": ["/images/products/ten-san-pham.svg"],
  "featured": false,
  "active": true,
  "sortOrder": 10
}
```

Lưu ý:
- `id` và `slug` phải **duy nhất**, không trùng với sản phẩm khác.
- `category` phải đúng một `id` có trong `categories.json`.
- `priceType` chỉ nhận `"fixed"` (có giá cụ thể) hoặc `"quote"` (liên hệ báo giá).
- Nếu `priceType` là `"fixed"`, phải có `price` là số >= 0.
- Nếu `priceType` là `"quote"`, **không** khai báo `price`.

### Thêm nhiều ảnh cho một sản phẩm

Thêm nhiều đường dẫn vào mảng `images`, ảnh đầu tiên là ảnh chính hiển thị ở danh sách sản phẩm:

```json
"images": [
  "/images/products/san-pham-anh-1.jpg",
  "/images/products/san-pham-anh-2.jpg"
]
```

Đặt file ảnh thật vào thư mục `public/images/products/`. Nên dùng ảnh vuông (tỉ lệ 1:1) để hiển thị đẹp.

### Đổi giá sản phẩm

Sửa trực tiếp trường `price` (đơn vị VND, chỉ nhập số, không nhập dấu chấm/phẩy). Ví dụ `"price": 75000` sẽ hiển thị là `75.000 ₫`.

### Ẩn / hiện sản phẩm

- Ẩn sản phẩm khỏi website: đặt `"active": false`.
- Hiện lại: đặt `"active": true`.

Sản phẩm `active: false` sẽ không hiển thị ở bất kỳ đâu trên website, dù vẫn còn trong file dữ liệu.

### Đánh dấu sản phẩm nổi bật

Đặt `"featured": true` để sản phẩm hiện nhãn "Nổi bật" trên thẻ sản phẩm.

### Thêm danh mục mới

Mở `src/data/categories.json`, thêm:

```json
{
  "id": "danh-muc-moi",
  "name": "Tên danh mục",
  "description": "Mô tả ngắn.",
  "active": true,
  "sortOrder": 6
}
```

Danh mục chỉ hiển thị trên thanh điều hướng khi có ít nhất 1 sản phẩm `active: true` thuộc danh mục đó.

### Đổi thông tin liên hệ / tên thương hiệu

Sửa trong `src/data/site.json`: `brandName`, `tagline`, `heroTitle`, `heroDescription`, `phone`, `zaloUrl`, `facebookUrl`, `contactLabel`, `footerText`.

## Đưa code lên GitHub

```bash
git remote add origin <URL-repo-github-cua-ban>
git branch -M main
git push -u origin main
```

(Tạo repo trống trên GitHub trước, không tạo sẵn README/license trên GitHub để tránh xung đột.)

## Tạo Cloudflare Pages project

1. Đăng nhập [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Chọn repo GitHub vừa đẩy code lên.
3. Cấu hình build:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Nhấn **Save and Deploy**.

File `public/_redirects` (nội dung `/* /index.html 200`) đã được thêm sẵn để tránh lỗi 404 khi tải lại trang (an toàn cho cả Cloudflare Pages và Netlify), dù trang này chỉ có một trang duy nhất nên thường không gặp vấn đề này.

## Kiểm tra URL sau khi deploy

Sau khi deploy xong, Cloudflare Pages sẽ cho một địa chỉ dạng `https://ten-project.pages.dev`. Mở link đó và kiểm tra:

- Trang chủ hiển thị đúng banner, danh sách sản phẩm.
- Tìm kiếm và lọc theo danh mục hoạt động.
- Bấm vào sản phẩm mở được chi tiết, đóng được bằng nút X hoặc phím Esc.
- Nút liên hệ (Zalo/điện thoại) trỏ đúng tới thông tin của bạn.
- Mở trên điện thoại kiểm tra giao diện responsive.

Nếu có domain riêng, vào **Custom domains** trong project Cloudflare Pages để gắn domain.

## Cách cập nhật website khi đổi dữ liệu

Mỗi khi sửa file trong `src/data/` hoặc thêm ảnh:

1. Sửa/thêm dữ liệu như hướng dẫn trên.
2. Chạy `npm run validate` để chắc chắn dữ liệu hợp lệ.
3. Commit và đẩy code lên GitHub (`git add`, `git commit`, `git push`).
4. Cloudflare Pages sẽ tự động build và deploy lại khi phát hiện commit mới trên nhánh đã kết nối.

Không cần làm gì thêm trên Cloudflare, miễn là project đã được kết nối với repo GitHub.
