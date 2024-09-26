# Mlaku-Mulu API

Mlaku-Mulu adalah RESTful API untuk pendataan perjalanan turis pengelolaan data turis, perjalanan, destinasi, dan riwayat perjalanan. Proyek ini dibangun menggunakan **NestJS**, **Prisma**, dan **PostgreSQL**.

## Fitur

- Autentikasi dan otorisasi untuk admin dan turis.
- Pengelolaan data turis (CRUD).
- Pengelolaan perjalanan dan destinasi.
- Riwayat perjalanan turis.

## Teknologi yang Digunakan

- **Node.js**: Runtime untuk menjalankan aplikasi.
- **NestJS**: Framework untuk membangun aplikasi server-side.
- **Prisma**: ORM untuk mengelola database.
- **PostgreSQL**: Database untuk menyimpan data aplikasi.
- **Swagger**: Untuk dokumentasi API.
- **Promotheus**: Monitoring aplikasi

## Instalasi

1. Clone repositori ini

   ```bash
   git clone https://github.com/username/mlaku-mulu.git
   ```

2. Masuk ke direktori proyek

    ```bash
    cd mlaku-mulu
    ```
  
3. Install dependensi

    ```bash
    npm install
    ```

4. Konfigurasi database
    - buat database dengan nama **mlaku-mulu**

5. Migrasi database

    ```bash
    npx prisma migrate dev --name create
    ```

6. Jalankan aplikasi

    ```bash
    npm run start
    ```

## Dokumentasi API

Dokumentasi dapat di akses **[disini](http://localhost:3000/api)** atau enpoint **/api**

## Monitoring

Monitoring Dengan **[Promotheus](https://prometheus.io/download/)** bisa diakses di enpoint **/api/metrics**. Bisa diintegrasikan dengan **Grafana** untuk monitoring

## Lisensi

Proyek ini dilisensikan di bawah MIT License. Lihat file *[LICENSE](https://github.com/nestjs/docs.nestjs.com/blob/master/LICENSE)* untuk informasi lebih lanjut.
