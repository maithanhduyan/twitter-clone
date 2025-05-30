# Màn hình **Notifications** (Thông báo) của ứng dụng Twitter Clone, với biểu tượng là **chiếc chuông 🔔** trong thanh điều hướng dưới cùng.

---

## 🧭 **MÔ TẢ LAYOUT & CHỨC NĂNG CHÍNH**

### 📍 1. **Thanh tiêu đề**

* **Ảnh đại diện**: Ở góc trên cùng bên trái — để truy cập hồ sơ cá nhân hoặc menu.
* **Tiêu đề “Notifications”**: Xác định bạn đang ở màn hình thông báo.
* **Biểu tượng bánh răng ⚙️**: Mở **cài đặt thông báo** — cho phép bạn tùy chỉnh loại thông báo bạn nhận được.

---

### 📂 2. **Tab điều hướng thông báo**

Có 3 tab chính giúp phân loại nội dung thông báo:

| Tab          | Chức năng                                                                                 |
| ------------ | ----------------------------------------------------------------------------------------- |
| **All**      | Hiển thị **tất cả các thông báo** (like, retweet, follow, đề xuất...).                    |
| **Verified** | Thông báo từ tài khoản đã xác minh (✔️). Hữu ích nếu bạn quan tâm đến người có ảnh hưởng. |
| **Mentions** | Chỉ hiện các tweet có **tag tên bạn** bằng @username.                                     |

Tab đang được chọn hiện tại là **All**.

---

### 🔔 3. **Dòng thông báo**

* Mỗi dòng là một thông báo riêng biệt, có thể là:

  * Người đăng bài bạn theo dõi.
  * Ai đó tương tác với tweet của bạn (thích, bình luận, retweet...).
  * Đề xuất từ Twitter (ví dụ: “New post from…”).

Ví dụ trong ảnh:

* **Thông báo từ ThuanCapital** và 2 người khác: bạn đã bật thông báo bài đăng mới cho họ.
* Các bài tweet từ **Gergely Orosz** và **Sam Altman** được đánh dấu đề xuất (biểu tượng ngôi sao tím ✨) — đây là nội dung đề xuất có độ tương tác cao.

---

### 🧭 4. **Thanh điều hướng dưới cùng**

Hiển thị 5 biểu tượng quen thuộc:

| Biểu tượng       | Chức năng                          |
| ---------------- | ---------------------------------- |
| 🏠 Home          | Về trang dòng thời gian chính.     |
| 🔍 Search        | Tìm kiếm người, tweet, xu hướng.   |
| 🔔 Notifications | (Trang hiện tại) Xem thông báo.    |
| ✉️ Messages      | Tin nhắn trực tiếp.                |
| 👤 (avatar bạn)  | Hồ sơ cá nhân hoặc menu tài khoản. |

---

### 🖊️ Nút tròn xanh (góc dưới phải)

* Biểu tượng bút + tia chớp: mở **khung soạn tweet mới** từ bất kỳ nơi nào trong ứng dụng.

---

Tính năng cần phát triển tiếp theo: **bật/tắt thông báo cho người cụ thể** hoặc **lọc loại thông báo**.

--- 
## AI Response
Màn hình Notifications này bao gồm:

✨ Tính năng chính:
1. Header tùy chỉnh với avatar, tiêu đề "Notifications" và nút cài đặt ⚙️
2. 3 tabs điều hướng: All, Verified, Mentions
3. Các loại thông báo đa dạng: like, retweet, follow, mention, new post, suggested
4. Visual indicators:
  - Biểu tượng riêng cho từng loại thông báo
  - Badge xác minh cho tài khoản verified
  - Ngôi sao tím cho nội dung đề xuất
  - Dấu chấm xanh cho thông báo chưa đọc
5. Tương tác: Touch để đánh dấu đã đọc và mở thông báo
6. Pull-to-refresh để cập nhật thông báo mới
7. FAB button để tạo tweet mới
8. Empty state khi không có thông báo
🎨 Design highlights:
- Sử dụng cùng color scheme và typography với HomeScreen
- Layout responsive với avatars chồng lên nhau cho multiple users
- Preview post content trong notification
- Visual feedback cho trạng thái read/unread