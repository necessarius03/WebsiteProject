const products = [
    {
        id: 1,
        name: "Gel Rửa Mặt La Roche-Posay Effaclar Purifying Foaming Gel For Oily Sensitive Skin",
        price: 383000,
        image: "images/products/1.png",
        category: "skincare",
        featured: true
    },
    {
        id: 2,
        name: "Gel Rửa Mặt SVR Sebiaclear Gel Moussant ",
        price: 324000,
        image: "images/products/2.png",
        category: "skincare",
        featured: true
    },
    {
        id: 3,
        name: "Gel Rửa Mặt Eucerin ProAcne Solution Cleansing Gel",
        price: 393000,
        image: "images/products/3.png",
        category: "skincare",
        featured: false
    },
    {
        id: 4,
        name: "Tea Tree Purifying Clay Mask & Cleanser In 1",
        price: 165000,
        image: "images/products/4.png",
        category: "skincare",
        featured: true
    },
    {
        id: 5,
        name: "Sữa rửa mặt loại bỏ bụi mịn Rejuvaskin Anti-Pollution",
        price: 400000,
        image: "images/products/5.png",
        category: "skincare",
        featured: true
    },
    {
        id: 6,
        name: "Sữa rửa mặt cho da khô Cetaphil Gentle Skin Cleanser",
        price: 385000,
        image: "images/products/6.png",
        category: "skincare",
        featured: false
    },
    {
        id: 7,
        name: "Sữa rửa mặt cho da khô nhạy cảm Kiehl's Calendula Deep Cleansing Foaming Face Wash",
        price: 985000,
        image: "images/products/7.png",
        category: "skincare",
        featured: false
    },
    {
        id: 8,
        name: "Sữa rửa mặt trắng da Sakura Whitening Facial Cleanser",
        price: 680000,
        image: "images/products/8.png",
        category: "skincare",
        featured: true
    },
    {
        id: 9,
        name: "Sữa rửa mặt Bioderma Atoderm Intensive Gel Moussant",
        price: 355000,
        image: "images/products/9.png",
        category: "skincare",
        featured: true
    },
    {
        id: 10,
        name: "Sữa rửa mặt Simple Refreshing Facial Wash",
        price: 95000,
        image: "images/products/10.png",
        category: "skincare",
        featured: false
    },
    {
        id: 11,
        name: "Sữa Rửa Mặt Eucerin pH5 dành cho da nhạy cảm",
        price: 239000,
        image: "images/products/11.png",
        category: "skincare",
        featured: true
    },
    {
        id: 12,
        name: "SVR Physiopure Gelée Moussante cho Da Nhạy Cảm ",
        price: 129000,
        image: "images/products/12.png",
        category: "skincare",
        featured: true
    },
    {
        id: 13,
        name: "Nước Hoa Hồng Simple Soothing Facial Toner Kind To Skin 200ml",
        price: 160000,
        image: "images/products/13.png",
        category: "fragrance",
        featured: false
    },
    {
        id: 14,
        name: "Nước Cân Bằng Cocoon Chiết Xuất Bí Đao Winter Melon 140ml",
        price: 195000,
        image: "images/products/14.png",
        category: "fragrance",
        featured: false
    },
    {
        id: 15,
        name: "Nước Hoa Hồng Cosrx AHA BHA Clarifying Treatment 150ml ",
        price: 235000,
        image: "images/products/15.png",
        category: "fragrance",
        featured: true
    },
    {
        id: 16,
        name: "Nước Hoa Hồng Some By Mi AHA-BHA-PHA 30 Days Miracle Toner Cho Da Mụn 150ml ",
        price: 263000,
        image: "images/products/16.png",
        category: "fragrance",
        featured: true
    },
    {
        id: 17,
        name: "Serum L'Oreal Hyaluronic Acid Cấp Ẩm Sáng Da ",
        price: 293000,
        image: "images/products/17.png",
        category: "skincare",
        featured: false
    },
    {
        id: 18,
        name: "Serum 9Wishes Dưỡng Ẩm & Làm Căng Bóng Da ",
        price: 198000,
        image: "images/products/18.png",
        category: "skincare",
        featured: true
    },
    {
        id: 19,
        name: "Serum Cocoon Cấp Nước & Cấp Ẩm Sâu Từ Hoa Hồng ",
        price: 225000,
        image: "images/products/19.png",
        category: "skincare",
        featured: true
    },
    {
        id: 20,
        name: "Serum Klairs Cấp Ẩm Cho Da Khô, Nhạy Cảm ",
        price: 286000,
        image: "images/products/20.png",
        category: "skincare",
        featured: false
    },
    {
        id: 21,
        name: "Innisfree Cherry Blossom Jelly Cream ",
        price: 450000,
        image: "images/products/21.png",
        category: "body",
        featured: false
    },
    {
        id: 22,
        name: "St.Ives Collagen ",
        price: 230000,
        image: "images/products/22.png",
        category: "body",
        featured: true
    },
    {
        id: 23,
        name: "Gel dưỡng da Aloe Vera Nature Republic ",
        price: 90000,
        image: "images/products/23.png",
        category: "body",
        featured: true
    },
    {
        id: 24,
        name: "Mặt nạ dưỡng da Kiehl’s Avocado Nourishing Hydration Mask 28ml dành cho da khô ",
        price: 650000,
        image: "images/products/24.png",
        category: "skincare",
        featured: false
    },
    {
        id: 25,
        name: "Mặt nạ dưỡng da nha đam Kiehl’s Calendula Petal-Infused Calming Mask 28ml",
        price: 550000,
        image: "images/products/25.png",
        category: "skincare",
        featured: true
    },
    {
        id: 26,
        name: "Mặt nạ dưỡng ẩm da Kiehl’s Rare Earth Deep Pore Cleansing Masque 28ml se khít lỗ chân lông ",
        price: 500000,
        image: "images/products/26.png",
        category: "skincare",
        featured: true
    },
    {
        id: 27,
        name: "Mặt nạ Hada labo - 30pcs",
        price: 300000,
        image: "images/products/27.png",
        category: "skincare",
        featured: false
    },
    {
        id: 28,
        name: "Mặt nạ Banobagi",
        price: 30000,
        image: "images/products/28.png",
        category: "skincare",
        featured: false
    },
    {
        id: 29,
        name: "Mặt nạ Benew",
        price: 10000,
        image: "images/products/29.png",
        category: "skincare",
        featured: true
    },
    {
        id: 30,
        name: "Kem nền Clinique Even Better Glow Light Reflecting Makeup ",
        price: 970000,
        image: "images/products/30.png",
        category: "makeup",
        featured: true
    },
    {
        id: 31,
        name: "Kem nền L'oreal Paris True Match ",
        price: 319000,
        image: "images/products/31.png",
        category: "makeup",
        featured: false
    },
    {
        id: 32,
        name: "Kem nền Laneige Layering Cover Cushion & Concealing Base ",
        price: 495000,
        image: "images/products/32.png",
        category: "makeup",
        featured: true
    },
    {
        id: 33,
        name: "Kem nền Bobbi Brown Skin Long-Wear Fluid Powder Foundation ",
        price: 1320000,
        image: "images/products/33.png",
        category: "makeup",
        featured: true
    },
    {
        id: 34,
        name: "Kem che khuyết điểm Maybelline Fit Me",
        price: 158000,
        image: "images/products/34.png",
        category: "makeup",
        featured: false
    },
    {
        id: 35,
        name: "Kem che khuyết điểm Merzy The First Creamy",
        price: 249000,
        image: "images/products/35.png",
        category: "makeup",
        featured: false
    },
    {
        id: 36,
        name: "Kem che khuyết điểm Clio Kill Cover Airy-Fit Concealer",
        price: 335000,
        image: "images/products/36.png",
        category: "makeup",
        featured: true
    },
    {
        id: 37,
        name: "Kem che khuyết điểm A'pieu Bonding Drops Concealer",
        price: 249000,
        image: "images/products/37.png",
        category: "makeup",
        featured: true
    },
    {
        id: 38,
        name: "Má Hồng Trang Điểm Dear Dahlia Blooming Edition Petal Glow Blush 3.8g",
        price: 699000,
        image: "images/products/38.png",
        category: "skincare",
        featured: false
    },
    {
        id: 39,
        name: "Má Hồng Peripera Pure Blushed Sunshine Cheek 4.2G",
        price: 139000,
        image: "images/products/39.png",
        category: "skincare",
        featured: true
    },
    {
        id: 40,
        name: "Má Hồng Dạng Kem Ofélia Lolli Liquid Blush 4.3g",
        price: 399000,
        image: "images/products/40.png",
        category: "skincare",
        featured: true
    },
    {
        id: 41, 
        name: "Phấn má hồng 3 màu Too Cool For School Artclass By Rodin De Rose",
        price: 569000,
        image: "images/products/41.png",
        category: "skincare",
        featured: false
    },
    {
        id: 42,
        name: "Son dưỡng Bioderma Atoderm Levres",
        price: 130000,
        image: "images/products/42.png",
        category: "makeup",
        featured: false
    },
    {
        id: 43,
        name: "Son dưỡng Carmex",
        price: 73000,
        image: "images/products/43.png",
        category: "makeup",
        featured: false
    },
    {
        id: 44,
        name: "Son dưỡng Nars Orgasm 3420 AfterGlow  ",
        price: 800000,
        image: "images/products/44.png",
        category: "makeup",
        featured: true
    },
    {
        id: 45,
        name: "Son dưỡng Dior Addict Lip Glow ",
        price: 750000,
        image: "images/products/45.png",
        category: "makeup",
        featured: false
    },
    {
        id: 46,
        name: "Son dưỡng Labocare Panteno",
        price: 80000,
        image: "images/products/46.png",
        category: "makeup",
        featured: true
    },
    {
        id: 47,
        name: "Son dưỡng Tatcha Camellia Gold Spun ",
        price: 1200000,
        image: "images/products/47.png",
        category: "makeup",
        featured: true
    },
    {
        id: 48,
        name: "Merzy The Heritage All Day Lip Care ",
        price: 179000,
        image: "images/products/48.png",
        category: "makeup",
        featured: false
    },
    {
        id: 49,
        name: "Romand Juicy Lasting Tint ",
        price: 139000,
        image: "images/products/49.png",
        category: "makeup",
        featured: false
    },
    {
        id: 50,
        name: "Romand Glasting Water Tint ",
        price: 139000,
        image: "images/products/50.png",
        category: "makeup",
        featured: true
    },
    {
        id: 51,
        name: "Lilybyred Glassy Layer Fixing Tint ",
        price: 149000,
        image: "images/products/51.png",
        category: "makeup",
        featured: true
    },
    {
        id: 52,
        name: "Eglips Water Glaze Tint",
        price: 159000,
        image: "images/products/52.png",
        category: "makeup",
        featured: false
    },
    {
        id: 53,
        name: "Bảng Phấn Mắt Maybelline 6 Ô The City Mini Palette ",
        price: 215000,
        image: "images/products/53.png",
        category: "makeup",
        featured: true
    },
    {
        id: 54,
        name: "Phấn Mắt Romand 10 Ô Better Than Palette ",
        price: 315000,
        image: "images/products/54.png",
        category: "makeup",
        featured: true
    },
    {
        id: 55,
        name: "Phấn mắt Clio Pro Eye Palette 12 Autumn ",
        price: 345000,
        image: "images/products/55.png",
        category: "makeup",
        featured: false
    },
    {
        id: 56,
        name: "Phấn Mắt Lilybyred Mood Keyboard Palette ",
        price: 355000,
        image: "images/products/56.png",
        category: "makeup",
        featured: false
    },
    {
        id: 57,
        name: "Phấn mắt CLIO Pro Eye Palette Air ",
        price: 499000,
        image: "images/products/57.png",
        category: "makeup",
        featured: true
    },
    {
        id: 58,
        name: "Bảng Phấn Mắt 3CE Multi Eye Color ",
        price: 746000,
        image: "images/products/58.png",
        category: "makeup",
        featured: true
    },
    {
        id: 59,
        name: "Chì kẻ chân mày The Face Shop Browlasting Waterproof Eyebrow Pencil ",
        price: 199000,
        image: "images/products/59.png",
        category: "makeup",
        featured: false
    },
    {
        id: 60,
        name: "Chì kẻ chân mày CLIO Kill Brow Auto Hard Brow Pencil Edge Slim ",
        price: 389000,
        image: "images/products/60.png",
        category: "makeup",
        featured: true
    },
    {
        id: 61,
        name: "Chì kẻ chân mày Merzy The First Brow Pencil ",
        price: 140000,
        image: "images/products/61.png",
        category: "makeup",
        featured: true
    },
    {
        id: 62,
        name: "Chì kẻ mày phẩy sợi A'Pieu Comb Brow Tint ",
        price: 189000,
        image: "images/products/62.png",
        category: "makeup",
        featured: false
    },
    {
        id: 63,
        name: "Tạo Khối Silkygirl 2 Đầu Photosharp Contour & Highlighter ",
        price: 238000,
        image: "images/products/63.png",
        category: "makeup",
        featured: false
    },
    {
        id: 64,
        name: "Tạo Khối Và Highlight City Color Contour Effect Palette 3 Ô 4.5g ",
        price: 150000,
        image: "images/products/64.png",
        category: "makeup",
        featured: true
    },
    {
        id: 65,
        name: "Tạo Khối Too Cool For School Artclass By Rodin Shading ",
        price: 225000,
        image: "images/products/65.png",
        category: "makeup",
        featured: true
    },
    {
        id: 66,
        name: "Phấn Highlight City Color Spotlight Highlight Dạng Kem 2.7g ",
        price: 115000,
        image: "images/products/66.png",
        category: "makeup",
        featured: false
    },
    {
        id: 67,
        name: "Dầu Xả TRESemme ",
        price: 120000,
        image: "images/products/67.png",
        category: "hair",
        featured: true
    },
    {
        id: 68,
        name: "Dầu xả Dove ",
        price: 114000,
        image: "images/products/68.png",
        category: "hair",
        featured: true
    },
    {
        id: 69, 
        name: "Dầu xả Tsubaki ",
        price: 200000,
        image: "images/products/69.png",
        category: "hair",
        featured: false
    },
    {
        id: 70,
        name: "Dầu Dưỡng L'Oreal Paris Elseve Extraodinary Oil ",
        price: 182000,
        image: "images/products/70.png",
        category: "hair",
        featured: false
    },
    {
        id: 71,
        name: "Serum Dưỡng Tóc Ellips Hair Vitamin Moroccan Oil Hair Treatment ",
        price: 193000,
        image: "images/products/71.png",
        category: "hair",
        featured: false
    },
    {
        id: 72,
        name: "Serum Bưởi Milaganics ",
        price: 94000,
        image: "images/products/72.png",
        category: "hair",
        featured: true
    },
    {
        id: 73,
        name: "Sữa tắm trắng da ST.IVES Even & Bright cam chanh ",
        price: 165000,
        image: "images/products/73.png",
        category: "hair",
        featured: false
    },
    {
        id: 74,
        name: "Sữa tắm có hạt Enchanteur",
        price: 179000,
        image: "images/products/74.png",
        category: "hair",
        featured: true
    },
    {
        id: 75,
        name: "Sữa Tắm Dưỡng Trắng Sữa Ong Chúa & Hoa Anh Đào Purité De Prôvence",
        price: 169000,
        image: "images/products/75.png",
        category: "hair",
        featured: true
    },
    {
        id: 76,
        name: "Muối tắm trắng da sữa bò Spa A Bonne Thái Lan 350g ",
        price: 29000,
        image: "images/products/76.png",
        category: "body",
        featured: false
    },
    {
        id: 77,
        name: "Tẩy Tế Bào Chết Body Exclusive Cosmetic Gel Scrub Slimming Coffee Cinnamon Cloves Quế Hồi ",
        price: 89000,
        image: "images/products/77.png",
        category: "body",
        featured: false
    },
    {
        id: 78,
        name: "Tẩy Tế Bào Chết Body Cocoon Sạch Da Dạng Túi Refill 600ml",
        price: 325000,
        image: "images/products/78.png",
        category: "body",
        featured: true
    },
    {
        id: 79,
        name: "Bộ Cọ Chuyên Nghiệp Vacosi Master Face Brush 24 Cây  ",
        price: 890000, 
        image: "images/products/79.png",
        category: "skincare",
        featured: true
    },
    {
        id: 80,
        name: "Bộ Cọ Real Techniques Everyday Essentials 4 Cọ Và 1 Mút Trang Điểm ",
        price: 425000,
        image: "images/products/80.png",
        category: "skincare",
        featured: false
    },
    {
        id: 81,
        name: "Bộ cọ trang điểm tốt 7 cây AUTUMN ",
        price: 100000,
        image: "images/products/81.png",
        category: "skincare",
        featured: true
    },
    {
        id: 82,
        name: "Bộ Cọ Trang Điểm Real Techniques Artist Essentials 5 Cây ",
        price: 360000,
        image: "images/products/82.png",
        category: "skincare",
        featured: true
    },
    {
        id: 83,
        name: "Bông Phấn Khô Vacosi Tròn Nhỏ BP01 ",
        price: 22000,
        image: "images/products/83.png",
        category: "makeup",
        featured: false
    },
    {
        id: 84,
        name: "Bông Tán Nền Vacosi Wedge Sponge Tam Giác - 3 PCS ",
        price: 21000,
        image: "images/products/84.png",
        category: "makeup",
        featured: false
    },
    {
        id: 85,
        name: "Bông Trang Điểm Giọt Nước Vacosi Pro ",
        price: 65000,
        image: "images/products/85.png",
        category: "makeup",
        featured: true
    },
    {
        id: 86,
        name: "Mút Tán Nền Real Techniques ",
        price: 165000,
        image: "images/products/86.png",
        category: "makeup",
        featured: true
    },
    {
        id: 87,
        name: "Bông tẩy trang Silcot Velvety Touch Cotton ",
        price: 40000,
        image: "images/products/87.png",
        category: "makeup",
        featured: false
    },
    {
        id: 88,
        name: "Bông tẩy trang Ipek Klasik Cotton Pads ",
        price: 23000,
        image: "images/products/88.png",
        category: "makeup",
        featured: true
    },
    {
        id: 89,
        name: "Bông tẩy trang Muji Organic Cotton ",
        price: 49000,
        image: "images/products/89.png",
        category: "makeup",
        featured: true
    },
    {
        id: 90, 
        name: "Bông tẩy trang Jomi ",
        price: 27000,
        image: "images/products/90.png",
        category: "makeup",
        featured: false
    },
    {
        id: 91,
        name: "Bông tẩy trang Mihoo Kokimi ",
        price: 32000,
        image: "images/products/91.png",
        category: "makeup",
        featured: false
    },
    {
        id: 92,
        name: "Bông tẩy trang Ola Silk Sense Cotton Pads ",
        price: 30000,
        image: "images/products/92.png",
        category: "makeup",
        featured: false
    },
];