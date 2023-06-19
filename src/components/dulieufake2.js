import React from 'react';
import '../css/dulieufake2.css';
import Chart from './Chart2';

function DuLieuKhoLine() {



    const chartData = {
        labels: [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12"],
        datasets: [
            {
                label: "Số lượng hàng nhập",
                data: [33, 53, 85, 41, 44, 65, 33, 64, 12, 6, 12, 65],
                fill: true,
                borderColor: "#16CC0C"
            },
            {
                label: "Số lượng hàng bán",
                data: [33, 25, 35, 51, 54, 76, 33, 23, 77, 35, 11, 89],
                fill: false,
                borderColor: "#FFEB24"
            },
            {
                label: "Tổng doanh thu",
                data: [13, 21, 57, 32, 12, 12, 42, 43, 12, 43, 33, 12],
                fill: false,
                borderColor: "#FF0010",
            },

        ]
    };
    return (
        <>
            <div className="dulieufake2">
                <div className="dulieufake2-header">
                    <h5>Doanh thu hằng tháng</h5>
                </div>
                <Chart chartData={chartData} />

            </div>
        </>
    );
}

export default DuLieuKhoLine;
