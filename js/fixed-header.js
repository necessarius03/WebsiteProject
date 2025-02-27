// Function để xử lý fixed header khi cuộn trang
function initFixedHeader() {
    const header = document.querySelector('.header');
    const body = document.body;
    
    // Không cần thực hiện nếu không tìm thấy header
    if (!header) {
        console.error("Header element not found!");
        return;
    }
    
    // Lấy chiều cao ban đầu của header
    const headerHeight = header.offsetHeight;
    
    // Hàm xử lý sự kiện cuộn
    function handleScroll() {
        // Lấy vị trí cuộn hiện tại
        const scrollPosition = window.scrollY || window.pageYOffset;
        
        // Thêm class fixed khi cuộn quá ngưỡng (có thể điều chỉnh)
        if (scrollPosition > 50) {
            header.classList.add('header--fixed');
            body.classList.add('has-fixed-header');
            body.style.paddingTop = `${headerHeight}px`;
        } else {
            header.classList.remove('header--fixed');
            body.classList.remove('has-fixed-header');
            body.style.paddingTop = '0';
        }
    }
    
    // Đăng ký sự kiện cuộn
    window.addEventListener('scroll', handleScroll);
    
    // Xử lý trường hợp người dùng đã cuộn trước khi trang tải xong
    handleScroll();
    
    console.log("Fixed header initialization complete");
}

// Chạy khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    // Đảm bảo phải chạy sau khi header đã được load
    if (document.querySelector('.header')) {
        initFixedHeader();
    } else {
        // Nếu header chưa được load, đợi đến khi nó xuất hiện
        const checkHeader = setInterval(() => {
            if (document.querySelector('.header')) {
                clearInterval(checkHeader);
                initFixedHeader();
            }
        }, 100);
    }
});