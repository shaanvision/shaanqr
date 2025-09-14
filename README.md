# ShaanQR - Ücretsiz QR Kod Oluşturucu

ShaanQR, kullanıcıların kolayca QR kodları oluşturmasına, özelleştirmesine ve indirmesine olanak tanıyan ücretsiz ve açık kaynaklı bir web uygulamasıdır. Bu proje Next.js kullanılarak oluşturulmuş ve Cloudflare Pages gibi statik barındırma platformlarında kolayca yayınlanabilecek şekilde yapılandırılmıştır.

## ✨ Özellikler

- **Farklı İçerik Türleri:** URL, düz metin, Wi-Fi ağ bilgileri, e-posta, telefon, SMS ve vCard (dijital kartvizit) için QR kodları oluşturun.
- **Gelişmiş Özelleştirme:**
  - QR kod boyutunu ayarlama.
  - Ön plan (noktalar) ve arka plan renklerini seçme.
  - Kenar boşluğunu (margin) belirleme.
  - Hata düzeltme seviyesini (L, M, Q, H) seçme.
  - QR kodunun ortasına kendi logonuzu veya bir resim yükleme.
- **İndirme ve Paylaşım:**
  - Oluşturulan QR kodlarını yüksek kaliteli **PNG** veya vektörel **SVG** formatında indirme.
  - QR kodu resmini panoya kopyalama.
  - Destekleyen cihazlarda Web Share API ile doğrudan paylaşma.
- **SEO ve Performans:** Google standartlarına uygun meta etiketleri, JSON-LD yapısal verileri ve statik site yapısı sayesinde yüksek performans ve arama motoru optimizasyonu.

## 🚀 Teknolojiler

- **Next.js (App Router):** Modern React framework'ü.
- **TypeScript:** Tip güvenliği için.
- **Tailwind CSS & ShadCN/UI:** Hızlı ve modern arayüz geliştirme.
- **React Hook Form & Zod:** Form yönetimi ve veri doğrulama.
- **qr-code-styling:** QR kodlarını oluşturma ve özelleştirme.

## 📦 Yayınlama

Bu proje, `output: 'export'` yapılandırması sayesinde tamamen statik bir site olarak derlenir. Bu, onu **Cloudflare Pages**, Vercel, Netlify veya GitHub Pages gibi sunucusuz platformlarda barındırmak için mükemmel hale getirir.

## 🔗 Repolar

- **GitHub:** [shaanvision/shaanqr](https://github.com/shaanvision/shaanqr)
- **GitLab:** [shaanvision/shaanqr](https://gitlab.com/shaanvision/shaanqr)

- **Shaan Vİsion:** (https://shaanvision.com.tr)
