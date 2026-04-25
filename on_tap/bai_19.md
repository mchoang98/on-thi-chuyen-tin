# Ngày 19 — Xâu: chuẩn hóa và đếm từ

## Mục tiêu
- Xóa khoảng trắng thừa
- Đếm từ
- Viết hoa chữ cái đầu mỗi từ

---

## Thời lượng (~4 giờ)

| Phần | Thời gian |
|------|----------|
| Lý thuyết | 60 phút |
| Code lại | 45 phút |
| Luyện bài | 90 phút |
| Review | 30–45 phút |

---

## 1. Chuẩn hóa khoảng trắng

```python
s = input()
words = s.split()
print(" ".join(words))
```

---

## 2. Đếm từ

```python
s = input()
words = s.split()
print(len(words))
```

---

## 3. Viết hoa đầu từ

```python
s = input()
print(" ".join(s.split()).title())
```

---

## Ghi nhớ

- Đọc kỹ input và output trước khi code.
- Ưu tiên cách làm đơn giản, đúng trước.
- Tự tạo test nhỏ để kiểm tra lỗi.
- Chú ý trường hợp biên.

---

## Bài luyện

1. Xóa khoảng trắng đầu và cuối xâu.

2. Đếm số từ có độ dài lớn hơn $3$.

3. Tìm từ dài nhất trong xâu.

4. Chuẩn hóa xâu rồi chuyển toàn bộ về chữ thường.

5. In mỗi từ trên một dòng sau khi chuẩn hóa.

---

## Checklist

- Hiểu được dạng bài chính của ngày học.
- Code lại được ví dụ mà không nhìn tài liệu.
- Làm được ít nhất 4/5 bài luyện.
- Ghi lại lỗi sai thường gặp.

---

## Kết quả

- Hoàn thành ngày 19 trong lộ trình 21 ngày.
- Có thêm một nhóm kỹ năng phục vụ thi lập trình cơ bản.
