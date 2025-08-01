## ข้อสอบ pre-interview assessment ตำแหน่ง Software Engineer (Senior)

### โจทย์สำหรับ Candidate Backend

1. จาก Lo-Fi ที่ทีม UX/UI สร้างขึ้นตามรูปด้านล่างให้ Candidate สร้าง APIs ที่จำเป็นสำหรับ UX/UI ตาม Lo-Fi
2. สร้าง APIs service ด้วย Go หรือ NodeJS
3. ออกแบบ Database สามารถเลือกได้ว่าจะเป็น NoSQL หรือ Relational ขึ้นอยู่กับ Candidate ตัดสินใจ
4. APIs จำเป็นต้องมีการ Authentication และ Authorize ด้วย User Role
   1. ทุก User ที่ Login สำเร็จ สามารถที่จะแก้ไขของแต่ละ Card ได้ทุกส่วน
   2. ยเเว้น "ความคิดเห็น", User ที่สร้าง "ความคิดเห็น" นั้นๆ เท่านั้น ที่จะสามารถ แก้ไข และ ลบ "ความคิดเห็น" นั้นได้
5. หาก APIs service สามารถทำ Rate limit ด้วยจะถือเป็นคะแนนพิเศษ

### วิธีการส่งโจทย์
1. ส่งงานเป็นลิงค์ GitHub Repository เปิดให้ Public Read
2. ใน Repository จะต้องประกอบด้วย
   1. Docker file สำหรับ Database image
   2. Docker file สำหรับ APIs service




Dependencies
1. Express
2. Prisma
3. Zod
4. Swagger, For devs to read spec of API then export to Postman or import to Postman
5. Jest