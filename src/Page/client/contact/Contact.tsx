import './Contact.css'
const Contact: React.FC = () => {
    return (
        <div>
            <div className="contact-container">
                <h1 className="contact-title">Liên hệ với chúng tôi</h1>
                <div className="contact-info">
                    <div className="contact-item">
                        <h3>Email</h3>
                        <p>support@example.com</p>
                    </div>
                    <div className="contact-item">
                        <h3>Điện thoại</h3>
                        <p>+84 123 456 789</p>
                    </div>
                    <div className="contact-item">
                        <h3>Địa chỉ</h3>
                        <p>123 Đường Công Nghệ, TP. Hồ Chí Minh, Việt Nam</p>
                    </div>
                </div>
                <div className="contact-form">
                    <div className="form-group">
                        <label htmlFor="name">Họ và tên</label>
                        <input type="text" id="name" placeholder="Nhập họ và tên" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Nhập email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Tin nhắn</label>
                        <textarea id="message" placeholder="Nhập tin nhắn của bạn"></textarea>
                    </div>
                    <button className="submit-button">Gửi tin nhắn</button>
                </div>
            </div>
        </div>
    );
};

export default Contact; 