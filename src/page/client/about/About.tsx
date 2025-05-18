import './About.css'

export const About: React.FC = () => {
    return (
        <div>
            <div className="about-container">
                <h1 className="about-title">Giới thiệu về chúng tôi</h1>
                <p className="about-content">
                    Chúng tôi là một đội ngũ đam mê công nghệ, cam kết mang đến những giải pháp sáng tạo và hiệu quả cho khách hàng. Với sứ mệnh cải thiện trải nghiệm người dùng, chúng tôi không ngừng học hỏi và phát triển để đáp ứng nhu cầu ngày càng cao của thị trường.
                </p>
                <div className="about-info">
                    <div className="info-card">
                        <h3>Sứ mệnh</h3>
                        <p>Đổi mới và nâng cao chất lượng cuộc sống thông qua công nghệ.</p>
                    </div>
                    <div className="info-card">
                        <h3>Tầm nhìn</h3>
                        <p>Trở thành đơn vị tiên phong trong lĩnh vực giải pháp kỹ thuật số.</p>
                    </div>
                    <div className="info-card">
                        <h3>Giá trị cốt lõi</h3>
                        <p>Chất lượng, sáng tạo và trách nhiệm với cộng đồng.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};