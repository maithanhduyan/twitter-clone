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

## Màn hình HomeScreen
### Tính năng chính của Floating Action Button:
1. Mở Modal tạo tweet
Khi nhấn FAB, sẽ mở modal để tạo tweet mới
Modal có animation slide từ dưới lên
2. Modal tạo tweet bao gồm:
Header: Nút Hủy, tiêu đề "Tạo Tweet", nút Tweet
Body: Avatar và TextInput để nhập nội dung
Footer: Bộ đếm ký tự (280 ký tự tối đa)
3. Validation:
Kiểm tra nội dung không được rỗng
Giới hạn 280 ký tự
Nút Tweet chỉ active khi có nội dung
4. Chức năng:
Tạo tweet mới với timestamp "now"
Thêm tweet vào đầu danh sách
Hiển thị thông báo thành công
Reset form và đóng modal
5. UX/UI:
Character counter đổi màu đỏ khi gần giới hạn
Nút Tweet disabled khi chưa có nội dung
Auto focus vào TextInput khi mở modal
Có thể đóng modal bằng nút Hủy
Tweet mới sẽ xuất hiện ở đầu danh sách với tên "You" và thời gian "now".

### Three-dot menu icon
Trong ảnh bạn cung cấp, biểu tượng dấu **(...)** (ba chấm dọc) nằm ở góc trên bên phải của mỗi bài đăng trên Twitter (X) có chức năng **mở menu tùy chọn** cho bài đăng đó.

Khi bạn nhấn vào dấu **(...)**, một menu ngữ cảnh sẽ hiện ra với các tùy chọn như:

* **Follow/Unfollow** người đăng bài.
* **Not interested in this post** (Không quan tâm bài viết này).
* **Mute** (Tắt tiếng người đăng bài).
* **Block** người đăng bài.
* **Report post** (Báo cáo bài viết).
* **Embed Tweet** (Nhúng tweet vào website).
* **Copy link to Tweet** (Sao chép liên kết đến bài viết).

Tùy chọn cụ thể có thể thay đổi tùy vào ngữ cảnh (ví dụ: bạn có đang theo dõi người đó không, bạn có là chủ bài đăng không, v.v.).

### Bài đăng (Post)
Dưới mỗi bài đăng (tweet) trên Twitter (X), bạn sẽ thấy một hàng các biểu tượng (icon) đại diện cho các chức năng tương tác. Từ trái sang phải, các icon lần lượt là:

---

1. 🗨️ **Reply (Trả lời)**

* **Chức năng**: Trả lời bài đăng công khai.
* **Khi nhấp vào**: Mở khung nhập bình luận để bạn viết phản hồi.

---

2. 🔁 **Retweet (Chia sẻ lại)**

* **Chức năng**:

  * **Retweet**: Chia sẻ lại nguyên văn bài đăng lên trang cá nhân.
  * **Quote Tweet**: Chia sẻ lại kèm thêm ý kiến cá nhân.
* **Khi nhấp vào**: Hiện menu chọn kiểu chia sẻ lại.

---

3. ❤️ **Like (Thích)**

* **Chức năng**: Thể hiện bạn yêu thích bài viết.
* **Khi nhấp vào**: Tim sẽ chuyển sang màu đỏ, số lượng Like tăng lên.

---

4. 📊 **View Count (Lượt xem)**

* **Chức năng**: Hiển thị số lần bài đăng đã được xem.
* **Không thể nhấp**: Đây là thông tin tĩnh, không có chức năng tương tác.

---

5. 🔗 **Share (Chia sẻ)**

* **Chức năng**: Mở menu chia sẻ bài đăng với các tùy chọn:

  * Gửi qua tin nhắn.
  * Sao chép liên kết.
  * Chia sẻ ngoài nền tảng (email, mạng xã hội khác).
  * Bookmark (lưu bài viết).


### Thanh Điều Hướng: `For you`, `Following`
Trên Twitter (nay gọi là **X**), thanh điều hướng đầu trang có hai tab chính:

---

1. **For you** (Dành cho bạn)

* ✅ **Nội dung hiển thị**:
  Dòng thời gian được **thuật toán đề xuất**, gồm:

  * Bài đăng từ người bạn *không theo dõi* nhưng có liên quan đến sở thích, tương tác, xu hướng...
  * Các bài được người bạn theo dõi thích, bình luận, chia sẻ...
  * Nội dung đang "hot" hoặc viral.

* 🔍 **Mục tiêu**:
  Giúp bạn khám phá thêm nội dung mới ngoài những tài khoản bạn theo dõi.

* 📌 **Tính năng đặc biệt**:
  Nội dung được sắp xếp không theo thứ tự thời gian, mà theo mức độ liên quan.

---

2. **Following** (Đang theo dõi)

* ✅ **Nội dung hiển thị**:
  Chỉ hiển thị bài đăng từ những tài khoản **bạn đang theo dõi**.

* 📆 **Thứ tự hiển thị**:
  Theo **thời gian thực** (gần đây nhất ở trên cùng).

* 📌 **Mục tiêu**:
  Giúp bạn theo dõi sát sao nội dung của những người bạn quan tâm.

---

📝 Tóm lại:

| Tab           | Nội dung               | Sắp xếp        | Gợi ý người lạ |
| ------------- | ---------------------- | -------------- | -------------- |
| **For you**   | Gợi ý từ thuật toán    | Theo liên quan | Có             |
| **Following** | Tài khoản bạn theo dõi | Theo thời gian | Không          |


### Chức năng đăng bài (Post)
**giao diện tạo Tweet mới** trên Twitter Clone. Dưới đây là phần mô tả **layout** và chức năng của từng thành phần:

---

## 📋 **TỔNG THỂ LAYOUT**

* **Ảnh đại diện** (trái trên cùng): Avatar tài khoản bạn đang dùng để đăng tweet.
* **Khung nhập nội dung**: Nơi bạn nhập nội dung tweet ("What’s happening?").
* **Tùy chọn người trả lời**: "Everyone can reply" – cho phép bạn kiểm soát ai được phép phản hồi.
* **Thanh công cụ biểu tượng (icon)**: Chèn ảnh, GIF, poll, cảm xúc, v.v.
* **Nút điều hướng & chức năng**:

  * ⬅️ (góc trái trên cùng): Thoát khỏi trình soạn tweet.
  * **Drafts**: Xem các tweet đã lưu nháp.
  * **Post**: Đăng tweet.

---

## 🔵 **CÁC CHỨC NĂNG CỤ THỂ**

### 🔘 `Everyone can reply`

* Đây là cài đặt quyền **trả lời tweet**.
* Nhấn vào để thay đổi thành:

  * ✅ **Everyone can reply** – Mọi người đều có thể trả lời.
  * 👥 **People you follow** – Chỉ người bạn theo dõi mới trả lời được.
  * 🙋 **Only people you mention** – Chỉ người được gắn thẻ trong tweet mới được trả lời.

---

### 🗂️ `Drafts`

* Hiển thị danh sách các tweet **đã soạn nhưng chưa đăng**.
* Cho phép bạn chỉnh sửa, đăng hoặc xóa các tweet nháp.

---

### 🚀 `Post`

* Nút **đăng tweet** chính thức.
* Chỉ có thể bấm nếu có nội dung được nhập hoặc tệp đính kèm hợp lệ.

---

## 🧩 **DANH SÁCH ICON CHÈN (TỪ TRÁI SANG PHẢI)**

1. 🖼️ **Ảnh (Image)** – Tải ảnh từ máy vào tweet.
2. 🎞️ **GIF** – Thêm ảnh động từ thư viện GIF của Twitter.
3. 📊 **Poll** – Tạo bình chọn với các lựa chọn.
4. 📅 **Schedule** – Đặt lịch để đăng tweet sau (nếu bạn có X Premium).
5. 😀 **Emoji** – Mở bộ chọn biểu tượng cảm xúc.
6. 📷 **Camera** – Mở camera (chụp ảnh/video trực tiếp).
7. 📍 **Location** – Gắn địa điểm vào tweet.

### Màn hình Search (Tìm kiếm)
**màn hình “Search” (Tìm kiếm)** của ứng dụng Twitter Clone trên thiết bị di động . Dưới đây là mô tả chi tiết về **layout** và **tính năng** của từng phần:

---

## 🧭 **LAYOUT TỔNG THỂ & CHỨC NĂNG**

### 📍 **1. Thanh tìm kiếm (Search bar)** – Trên cùng

* Có biểu tượng kính lúp và dòng chữ **"Search Twitter"**.
* Chức năng:

  * Nhấn vào để nhập từ khóa.
  * Tìm người dùng, hashtag, chủ đề, hoặc tweet.

---

### 🧵 **2. Mục “Trends for you” (Xu hướng dành cho bạn)**

* Tiêu đề: **Trends for you** – những chủ đề nổi bật Twitter đề xuất riêng cho bạn.
* Hiện tại bạn thấy thông báo:

  > “No new trends for you”
  > Nghĩa là: chưa có xu hướng nào nổi bật trong khu vực hiện tại.

#### 🔘 Nút **“Change location”**

* Chức năng: thay đổi khu vực địa lý để xem xu hướng tại nơi khác (ví dụ: chuyển từ Việt Nam sang Mỹ hoặc Nhật).
* Khi nhấn: bạn chọn quốc gia/thành phố và sẽ thấy các trending topics của nơi đó.

---

### 🧭 **3. Thanh điều hướng dưới cùng** (Bottom Navigation Bar)

| Biểu tượng       | Chức năng                                      |
| ---------------- | ---------------------------------------------- |
| 🏠 Home          | Trở lại trang dòng thời gian chính.            |
| 🔍 Search        | Trang bạn đang xem – tìm kiếm và xem xu hướng. |
| 🔔 Notifications | Xem thông báo (like, reply, retweet…).         |
| ✉️ Messages      | Truy cập tin nhắn trực tiếp (DM).              |

---

### 🖊️ **4. Nút soạn tweet (nút tròn xanh, góc dưới phải)**

* Biểu tượng bút + tia chớp.
* Nhấn để mở khung **tạo tweet mới** từ bất kỳ nơi nào trong app.

---

## 📌 Gợi ý nâng cao

Bạn có thể sử dụng tính năng tìm kiếm để:

* Tìm bài viết theo từ khóa, hashtag.
* Tìm tài khoản người dùng (bằng tên hoặc @handle).
* Lọc kết quả theo tab: **Top, Latest, People, Photos, Videos** (sẽ hiển thị sau khi bạn bắt đầu tìm kiếm).

---
### Contexts

Lợi ích của việc sử dụng AuthContext:

- Centralized state management: Quản lý trạng thái đăng nhập tập trung
- Global access: Có thể access thông tin user từ bất kỳ component nào
- Automatic persistence: Tự động lưu/load token từ AsyncStorage
- Type safety: TypeScript support đầy đủ
- Reusability: Có thể sử dụng lại logic auth ở nhiều nơi
- Clean separation: Tách biệt logic auth khỏi UI components


