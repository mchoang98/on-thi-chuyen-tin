# Ngày 20 — Xâu: tách số và xử lý số trong xâu

## Mục tiêu
- Tách các số liên tiếp trong xâu
- Tìm số lớn nhất
- Tính tổng các số trong xâu

---

## Thời lượng (~4 giờ)

| Phần | Thời gian |
|------|----------|
| Lý thuyết | 60 phút |
| Code lại | 45 phút |
| Luyện bài | 90 phút |
| Review | 30–45 phút |

---

## 1. Tách số

```python
s = input()
temp = ""

for ch in s:
    if ch.isdigit():
        temp += ch
    else:
        if temp != "":
            print(int(temp))
            temp = ""

if temp != "":
    print(int(temp))
```

---

## 2. Tìm số lớn nhất trong xâu

```python
s = input()
temp = ""
rmax = None

for ch in s:
    if ch.isdigit():
        temp += ch
    else:
        if temp != "":
            val = int(temp)
            rmax = val if rmax is None else max(rmax, val)
            temp = ""

if temp != "":
    val = int(temp)
    rmax = val if rmax is None else max(rmax, val)

print(rmax)
```

---

## Ghi nhớ

- Đọc kỹ input và output trước khi code.
- Ưu tiên cách làm đơn giản, đúng trước.
- Tự tạo test nhỏ để kiểm tra lỗi.
- Chú ý trường hợp biên.

---

## Bài luyện

1. $$
   Tính tổng tất cả các số xuất hiện trong xâu.
   $$

2. Đếm có bao nhiêu số trong xâu.

3. Tìm số nhỏ nhất trong xâu.

4. Liệt kê các số chẵn xuất hiện trong xâu.

5. Tìm số có nhiều chữ số nhất trong xâu.

---

## Checklist

- Hiểu được dạng bài chính của ngày học.
- Code lại được ví dụ mà không nhìn tài liệu.
- Làm được ít nhất 4/5 bài luyện.
- Ghi lại lỗi sai thường gặp.

---

## Kết quả

- Hoàn thành ngày 20 trong lộ trình 21 ngày.
- Có thêm một nhóm kỹ năng phục vụ thi lập trình cơ bản.
