import React from 'react';
import '../css/Dangkychitiet.css';
import { Link } from 'react-router-dom';

function Dangkychitiet() {

    return (
        <div className="login-body">
            <div className="auth-wrapper">
                <div className="auth-inner1">
                    <form>
                        <h3 className="login-h3">Đăng ký</h3>

                        <div className="form-group">
                            <label>Tên</label>
                            <input type="text" className="form-control" placeholder="Tên" />
                        </div>

                        <div className="form-group">
                            <label>Họ và Tên Đệm</label>
                            <input type="text" className="form-control" placeholder="Họ và Tên Đệm" />
                        </div>

                        <div className="form-group">
                            <label>Địa Chỉ Email</label>
                            <input type="email" className="form-control" placeholder="Email" />
                        </div>

                        <div className="form-group">
                            <label>Mật Khẩu</label>
                            <input type="password" className="form-control" placeholder="Mật Khẩu" />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Đăng ký</button>
                        <p className="forgot-password text-right">
                            Đã có tài khoản? <a href="/sign-in">Đăng nhập</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Dangkychitiet;
