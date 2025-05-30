# twitter-clone
một nền tảng mạng xã hội nổi bật với chức năng chính là chia sẻ thông tin nhanh chóng dưới dạng các bài đăng ngắn gọi là "tweet"

Twitter (hiện nay đổi tên thành **X** sau khi được Elon Musk mua lại vào năm 2022) là một nền tảng mạng xã hội nổi bật với chức năng chính là **chia sẻ thông tin nhanh chóng dưới dạng các bài đăng ngắn gọi là "tweet"**. Dưới đây là những chức năng chính của Twitter:

---

### 🌐 **1. Đăng bài (Tweet)**

* Mỗi bài đăng (tweet) ban đầu giới hạn 140 ký tự, hiện đã tăng lên 280 ký tự (hoặc hơn với người dùng trả phí).
* Tweet có thể kèm hình ảnh, video, liên kết, biểu tượng cảm xúc, hashtag (#), và gắn thẻ người dùng (@).

---

### 🔁 **2. Tương tác xã hội**

* **Retweet**: Chia sẻ lại tweet của người khác.
* **Like (thích)**: Biểu lộ sự quan tâm đến một tweet.
* **Reply (trả lời)**: Phản hồi công khai một tweet.
* **Quote Tweet**: Chia sẻ lại tweet kèm bình luận riêng.

---

### 🧵 **3. Chuỗi Tweet (Thread)**

* Dùng để chia sẻ nội dung dài hơn bằng cách nối nhiều tweet lại với nhau theo thứ tự.

---

### 🔍 **4. Tìm kiếm & Hashtag**

* Hashtag (#) giúp nhóm các chủ đề lại với nhau.
* Twitter có công cụ tìm kiếm mạnh mẽ để theo dõi xu hướng, từ khoá hoặc tài khoản cụ thể.

---

### 📈 **5. Xu hướng (Trending)**

* Hiển thị những chủ đề phổ biến đang được thảo luận nhiều nhất tại thời điểm đó (theo khu vực hoặc toàn cầu).

---

### 📢 **6. Tài khoản & Theo dõi**

* Người dùng có thể **theo dõi** nhau để xem tweet của đối phương trong dòng thời gian (timeline).
* Có thể tạo **danh sách (Lists)** để nhóm các tài khoản theo chủ đề riêng.

---

### 🛠️ **7. Tùy chọn bảo mật & cài đặt**

* Có thể đặt tài khoản công khai hoặc riêng tư.
* Chặn, tắt tiếng (mute), hoặc báo cáo các tài khoản hoặc nội dung không phù hợp.

---

### 💬 **8. Tin nhắn trực tiếp (Direct Messages - DM)**

* Cho phép người dùng trò chuyện riêng tư với nhau.

---

### 🎥 **9. Spaces (Phòng thoại trực tiếp)**

* Tính năng âm thanh trực tiếp tương tự như Clubhouse, nơi người dùng có thể nghe và tham gia thảo luận bằng giọng nói theo chủ đề.

---

Dưới đây là mô tả chi tiết **UI/UX của từng màn hình chính trong mobile app Twitter (nay là X)**. Mỗi phần bao gồm thiết kế giao diện (UI – User Interface) và trải nghiệm người dùng (UX – User Experience):

---

## 🏠 1. **Trang chính (Home / Timeline)**

### 📱 **UI:**

* **Thanh điều hướng dưới cùng** gồm 5 biểu tượng: Home, Search, Post, Notifications, Messages.
* **Dòng thời gian (feed)** hiển thị danh sách tweet theo thứ tự thời gian hoặc theo thuật toán (For You / Following).
* Mỗi tweet hiển thị: ảnh đại diện, tên, username, nội dung, hình ảnh/video đính kèm (nếu có), thời gian đăng, và các nút tương tác (like, retweet, reply, share).
* Tùy chọn chuyển đổi giữa tab **“For You”** và **“Following”** ở phía trên đầu trang.

### 💡 **UX:**

* Lướt liên tục (infinite scroll) để xem nội dung không giới hạn.
* Có thể nhấn giữ tweet để mở menu nhanh (like, bookmark, share, v.v.).
* Thao tác đơn giản – một cú chạm là có thể retweet hoặc like.
* Vuốt nhẹ từ trên xuống để **refresh timeline**.

---

## 🔍 2. **Khám phá (Explore / Search)**

### 📱 **UI:**

* Thanh tìm kiếm ở trên cùng.
* Dưới thanh tìm kiếm là các **trending topics** theo khu vực hoặc toàn cầu.
* Các mục chia theo thẻ: For You, Trending, News, Sports, Entertainment.

### 💡 **UX:**

* Gợi ý nội dung theo sở thích, thói quen, vị trí địa lý.
* Kết quả tìm kiếm hiển thị cả tweet, tài khoản, hình ảnh, video liên quan.
* Tính năng tìm kiếm thông minh: autocomplete, lọc kết quả.

---

## ✍️ 3. **Đăng bài (Compose / Tweet)**

### 📱 **UI:**

* Mở từ biểu tượng “+” hoặc bút chì.
* Giao diện viết tweet đơn giản: ô soạn thảo ở trung tâm màn hình.
* Các nút để thêm: hình ảnh, GIF, emoji, cuộc thăm dò, lịch biểu đăng.
* Nút “Tweet” (hoặc “Post”) màu xanh nổi bật ở góc trên bên phải.

### 💡 **UX:**

* Hỗ trợ viết thread (thêm nhiều tweet liền nhau).
* Cảnh báo nếu vượt quá giới hạn ký tự.
* Có thể nháp bài viết nếu thoát khỏi màn hình giữa chừng.

---

## 🔔 4. **Thông báo (Notifications)**

### 📱 **UI:**

* Có hai tab chính: **All** và **Mentions**.
* Hiển thị theo dòng thời gian các lượt like, retweet, reply, theo dõi mới, đề cập đến bạn (@).

### 💡 **UX:**

* Sử dụng biểu tượng chấm đỏ để thông báo cập nhật mới.
* Chạm vào từng thông báo sẽ dẫn người dùng đến nội dung liên quan.

---

## 📩 5. **Tin nhắn (Messages / DM)**

### 📱 **UI:**

* Danh sách cuộc trò chuyện theo thứ tự thời gian.
* Giao diện chat giống các ứng dụng nhắn tin khác (bong bóng tin nhắn).
* Có thể gửi ảnh, GIF, biểu tượng cảm xúc.

### 💡 **UX:**

* Giao diện tối giản, dễ sử dụng như ứng dụng nhắn tin thông thường.
* Hỗ trợ tạo nhóm chat.
* Có thể gửi tweet trong tin nhắn.

---

## 👤 6. **Trang cá nhân (Profile)**

### 📱 **UI:**

* Hiển thị ảnh bìa, ảnh đại diện, tên, username, mô tả, liên kết, số lượng người theo dõi và đang theo dõi.
* Tabs: Tweets, Replies, Media, Likes.

### 💡 **UX:**

* Cho phép chỉnh sửa thông tin cá nhân nhanh chóng.
* Hiển thị hoạt động nổi bật để người dùng thể hiện cá tính.
* Giao diện nhất quán, dễ dẫn hướng đến các nội dung đã tweet.

---

## ⚙️ 7. **Cài đặt & Bảo mật**

### 📱 **UI:**

* Truy cập qua ảnh đại diện > Settings & privacy.
* Các mục gồm: Tài khoản, Riêng tư và bảo mật, Thông báo, Tùy chọn nội dung...

### 💡 **UX:**

* Dễ tìm, dễ thao tác bật/tắt các quyền riêng tư, kiểm duyệt nội dung, lọc người dùng.
* Hỗ trợ nhiều ngôn ngữ và kiểm soát quảng cáo cá nhân hóa.

---

## 🎤 8. **Spaces (Âm thanh trực tiếp)**

### 📱 **UI:**

* Giao diện tương tự một phòng họp âm thanh (voice room).
* Hiển thị người nói ở trên, người nghe ở dưới.
* Các nút: Request to speak, leave, emoji reactions.

### 💡 **UX:**

* Giao diện trực quan, dễ thao tác nghe hoặc nói.
* Có thể tiếp tục nghe khi đang sử dụng app phần khác (multitasking).

---

Màu sắc chủ đạo: Xanh nước biển, nền trắng, chữ đen

