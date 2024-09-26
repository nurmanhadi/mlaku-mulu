# Mlaku-Mulu API

Mlaku-Mulu adalah RESTful API untuk pendataan perjalanan turis pengelolaan data turis, perjalanan, destinasi, dan riwayat perjalanan. Proyek ini dibangun menggunakan **NestJS**, **Prisma**, dan **PostgreSQL**.

## Fitur

- Autentikasi dan otorisasi untuk admin dan turis.
- Pengelolaan data turis (CRUD).
- Pengelolaan perjalanan dan destinasi.
- Riwayat perjalanan turis.
- Monitoring health

## Teknologi yang Digunakan

- **[Node.js](https://nodejs.org/en/download/package-manager)**: Runtime untuk menjalankan aplikasi.
- **[NestJS](https://nestjs.com/)**: Framework untuk membangun aplikasi server-side.
- **[Prisma](https://www.prisma.io/)**: ORM untuk mengelola database.
- **[PostgreSQL](https://www.postgresql.org/)**: Database untuk menyimpan data aplikasi.
- **[Swagger](https://swagger.io/)**: Untuk dokumentasi API.
- **[Promotheus](https://prometheus.io/)**: Monitoring aplikasi
- **[Koyeb](https://koyeb.com/)** : Sebagai media web service untuk deployment

## Instalasi

1. Clone repositori ini

   ```bash
   git clone https://github.com/nurmanhadi/mlaku-mulu
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

Dokumentasi dapat di akses **[disini](https://superb-olivie-nurman-b8e0af0c.koyeb.app/api)** atau enpoint **/api**.
Pastikan untuk Authorize terlebih dahulu dengan memasukan token **[JWT](https://jwt.io/)**

## Monitoring

Monitoring Dengan **[Promotheus](https://prometheus.io/download/)** bisa diakses **[disini](https://superb-olivie-nurman-b8e0af0c.koyeb.app/metrics)**. Bisa diintegrasikan dengan **Grafana** untuk monitoring

## Lisensi

Proyek ini dilisensikan di bawah MIT License. Lihat file *[LICENSE](https://github.com/nestjs/docs.nestjs.com/blob/master/LICENSE)* untuk informasi lebih lanjut.
