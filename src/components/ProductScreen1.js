import React from 'react';
import '../css/ProductScreen1.css';
import { Link } from 'react-router-dom';
import Footer from './Footer';
function ProductScreen1() {

    return (
        <>
            <div className="App">
                <div className="row">
                    <div className="left">
                        <div className="Item">
                            <img className="pixer" src="https://img.pixers.pics/pho_wat(s3:700/FO/69/01/68/62/700_FO69016862_e5029fe1e933011e11e5645ba7f13c6b.jpg,700,366,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,480,316,jpg)/stickers-cup-of-black-coffee-with-roasted-coffe-beans.jpg.jpg" ></img>
                            <div className="title">
                                <h3>Mật Ong Tỏi PS1</h3>
                                <h5>Tỏi ngâm mật ong không tiêu diệt được En CÔ Vi nhưng có khả năng tăng hệ miễn dịch, tăng khả năng chiến đấu, giúp phòng và chống lại kẻ xâm lượt không mong muốn, En Co Vi.<br></br>
                                    <span className="date">April 7, 2014</span></h5>
                            </div>
                            <div className="title"><p>Vây trong tỏi và mật ong có những gì? Mà có khả năng phòng thủ giúp chống lại kẻ xâm nhập không mời En Cô Vi? Hãy cùng  Đặc Sản Mộc Buôn Ma Thuột tìm hiểu nhé Tỏi bao gồm các vitamin và khoáng chất vi lượng cần thiết cho cơ thể như phốt pho, magiê, iốt. Tỏi tươi có acillin chống lại các virus gây bệnh. Tinh dầu tỏi chứa aliin, glucogen và các thành phần khác chống viêm nhiễm, kháng khuẩn, sát trùng. Tỏi giàu chất oxy hóa, khôi…</p></div>
                            <div className="bottom-row">
                                <div className="cleft">
                                    <p><button className="button" src="/"><b><a href="/chitietbaiviet">READ MORE »</a></b></button></p>
                                </div>
                                <div className="cright">
                                    <p><span className="cmt-btn"><b>Comments  </b> <span className="person-cmt">2</span></span></p>
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="Item">
                            <img className="pixer" src="https://5.imimg.com/data5/DC/TD/MY-14296065/coffee-anise-cinnamon-spices-photo-wallpaper-2-copy-500x500.jpg" style={{ width: '100%', height: '10%' }}></img>
                            <div className="title">
                                <h3>Mật Ong Tỏi</h3>
                                <h5>Tỏi ngâm mật ong không tiêu diệt được En CÔ Vi nhưng có khả năng tăng hệ miễn dịch, tăng khả năng chiến đấu, giúp phòng và chống lại kẻ xâm lượt không mong muốn, En Co Vi.<br></br>
                                    <span className="date">April 7, 2014</span></h5>
                            </div>
                            <div className="title"><p>Vây trong tỏi và mật ong có những gì? Mà có khả năng phòng thủ giúp chống lại kẻ xâm nhập không mời En Cô Vi? Hãy cùng  Đặc Sản Mộc Buôn Ma Thuột tìm hiểu nhé Tỏi bao gồm các vitamin và khoáng chất vi lượng cần thiết cho cơ thể như phốt pho, magiê, iốt. Tỏi tươi có acillin chống lại các virus gây bệnh. Tinh dầu tỏi chứa aliin, glucogen và các thành phần khác chống viêm nhiễm, kháng khuẩn, sát trùng. Tỏi giàu chất oxy hóa, khôi…</p></div>
                            <div className="bottom-row">
                                <div className="cleft">
                                    <p><button className="button" src="/"><b><a href="/chitietbaiviet">READ MORE »</a></b></button></p>
                                </div>
                                <div className="cright">
                                    <p><span className="cmt-btn"><b>Comments  </b> <span className="person-cmt">2</span></span></p>
                                </div>
                            </div>
                        </div>
                        <div className="pagination">
                            <button className="btn-pre"><b>Previus</b></button>
                            <button className="btn-next" ><b>Next</b></button>
                        </div>
                        <br />
                    </div>
                    <div className="right">
                        <div className="info-cart">
                            <img className="info-img" src="https://live.staticflickr.com/4586/38356245336_6b439c3843_b.jpg" ></img>
                            <div className="info-story">
                                <h4>Đặc sản Ban Mê</h4>
                                <p>Mộc 47 – Đặc sản Ban Mê ra đời vào ngày 20 tháng 11 năm 2019 với tiêu chí: “Chế biến mộc – sạch – nguyên chất”. Doanh nghiệp ra đời với sứ mệnh mong muốn đưa những sản phẩm đặc trưng nhất, chất lượng nhất, sạch và an toàn nhất của vùng đất Ban Mê đến tay khách hàng. Chúng tôi đã quyết định, lựa chọn con đường đi lên bằng sự uy tín và chất lượng hàng đầu trong từng dòng sản phẩm.</p>
                            </div>
                        </div>
                        <hr />
                        <div className="categories">
                            <div className="cat-tittle">
                                <h4>Chuyên Mục</h4>
                            </div>
                            <div className="cat-item">
                                <div className="c-item" >
                                    <img src="https://live.staticflickr.com/4586/38356245336_6b439c3843_b.jpg" className="img-item" style={{ width: '70px', height: '70' }}></img>
                                    <div className="c-name">Bột ca cao</div>
                                </div>
                                <div className="c-item" >
                                    <img src="https://live.staticflickr.com/4586/38356245336_6b439c3843_b.jpg" className="img-item" style={{ width: '70px', height: '70' }}></img>
                                    <div className="c-name">Bột ca cao</div>
                                </div>
                                <div className="c-item" >
                                    <img src="https://live.staticflickr.com/4586/38356245336_6b439c3843_b.jpg" className="img-item" style={{ width: '70px', height: '70' }}></img>
                                    <div className="c-name">Bột ca cao</div>
                                </div>
                                <div className="c-item" >
                                    <img src="https://live.staticflickr.com/4586/38356245336_6b439c3843_b.jpg" className="img-item" style={{ width: '70px', height: '70' }}></img>
                                    <div className="c-name">Bột ca cao</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ProductScreen1;