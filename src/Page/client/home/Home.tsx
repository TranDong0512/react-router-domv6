import './Home.css'

const Home: React.FC = () => {

    return (
        <div>
            <div className="home-container">
                <h1 className="home-title">Chào mừng đến với trang chủ</h1>
                <p className="home-content">
                    Chúng tôi cung cấp các giải pháp công nghệ tiên tiến để giúp bạn đạt được mục tiêu của mình. Khám phá các dịch vụ và sản phẩm của chúng tôi để trải nghiệm sự khác biệt.
                </p>
                <div className="features">
                    <div className="feature-card">
                        <h3>Dịch vụ chất lượng</h3>
                        <p>Đảm bảo hiệu suất cao và sự hài lòng của khách hàng.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Công nghệ hiện đại</h3>
                        <p>Sử dụng các công nghệ tiên tiến nhất trên thị trường.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Hỗ trợ 24/7</h3>
                        <p>Đội ngũ hỗ trợ luôn sẵn sàng giúp bạn bất cứ lúc nào.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;