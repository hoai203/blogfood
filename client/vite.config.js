import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      "@ckeditor/ckeditor5-react",
      "@ckeditor/ckeditor5-build-classic",
    ],
  },
  server: {
    host: "0.0.0.0", // Địa chỉ IP. Sử dụng '0.0.0.0' để nghe trên tất cả các địa chỉ IP.
    // port: 4000, // Thay đổi cổng tại đây
  },
});
// "ckeditor5-custom-build"
// "ckeditor5-custom-build": "file:ckeditor5",
