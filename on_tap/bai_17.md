# Ngày 17 — Xâu: nhập, độ dài, duyệt ký tự

## Mục tiêu
- Nhập chuỗi có dấu cách
- Duyệt từng ký tự
- Đếm ký tự theo điều kiện

---

## Thời lượng (~4 giờ)

| Phần | Thời gian |
|------|----------|
| Lý thuyết | 60 phút |
| Code lại | 45 phút |
| Luyện bài | 90 phút |
| Review | 30–45 phút |

---

## 1. Độ dài xâu

```python
s = input()
print(len(s))
```

---

## 2. Duyệt ký tự

```python
s = input()
for ch in s:
    print(ch)
```

---

## 3. Đếm chữ số

```python
s = input()
cnt = 0
for ch in s:
    if '0' <= ch <= '9':
        cnt += 1
print(cnt)
```

---

## Ghi nhớ

- Đọc kỹ input và output trước khi code.
- Ưu tiên cách làm đơn giản, đúng trước.
- Tự tạo test nhỏ để kiểm tra lỗi.
- Chú ý trường hợp biên.

---

## Bài luyện

1. Đếm số chữ cái thường trong xâu.

2. Đếm số ký tự không phải chữ số.

3. $$
   Tính tổng các chữ số xuất hiện trong xâu.
   $$

4. Tìm ký tự đầu tiên là chữ số.

5. Kiểm tra xâu có chứa ký tự `@` hay không.

---

## Checklist

- Hiểu được dạng bài chính của ngày học.
- Code lại được ví dụ mà không nhìn tài liệu.
- Làm được ít nhất 4/5 bài luyện.
- Ghi lại lỗi sai thường gặp.

---

## Kết quả

- Hoàn thành ngày 17 trong lộ trình 21 ngày.
- Có thêm một nhóm kỹ năng phục vụ thi lập trình cơ bản.
