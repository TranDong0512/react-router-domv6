import './Dashboard.css'
const Dashboard: React.FC = () => {
    return (
        <div>
            <div className="dashboard-container">
                <h1 className="dashboard-title">Dashboard</h1>
                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>Người dùng</h3>
                        <p>1,234</p>
                    </div>
                    <div className="stat-card">
                        <h3>Doanh thu</h3>
                        <p>$12,345</p>
                    </div>
                    <div className="stat-card">
                        <h3>Đơn hàng</h3>
                        <p>567</p>
                    </div>
                    <div className="stat-card">
                        <h3>Lượt truy cập</h3>
                        <p>8,901</p>
                    </div>
                </div>
                <div className="chart-container">
                    <h3>Doanh thu theo tháng</h3>
                    <canvas id="revenueChart"></canvas>
                </div>
                <div className="recent-activities">
                    <h3>Hoạt động gần đây</h3>
                    <div className="activity-item">
                        <p>Người dùng admin đăng nhập</p>
                        <span>2025-04-19 10:30</span>
                    </div>
                    <div className="activity-item">
                        <p>Cập nhật sản phẩm #123</p>
                        <span>2025-04-19 09:15</span>
                    </div>
                    <div className="activity-item">
                        <p>Đơn hàng #456 hoàn tất</p>
                        <span>2025-04-19 08:45</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;