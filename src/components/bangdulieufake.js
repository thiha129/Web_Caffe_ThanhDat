import React, { Component } from 'react';
import '../css/bangdulieufake.css';
import { Bar, Line, Pie } from 'react-chartjs-2';

import { dataThongKe$, labelsThongKe$, soLuongBanThongKe$ } from '../redux/selectors';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../redux/actions'

export default function ThongKeChiTiets() {

    const [chartData, setChartData] = React.useState({
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "First dataset",
                data: [33, 53, 85, 41, 44, 65],
                fill: true,
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
                borderColor: "rgba(75,192,192,1)"
            }
        ]
    })

    const dispatch = useDispatch();
    const labels = useSelector(labelsThongKe$)
    const soLuong = useSelector(soLuongBanThongKe$)
    const data = useSelector(dataThongKe$)
    React.useEffect(() => {
        dispatch(actions.getDataThongKe.getDataThongKeRequest())
    }, [dispatch])

    React.useEffect(() => {
        setChartData({
            labels: labels,
            datasets: [
                {
                    label: "Sản phẩm đã bán được",
                    data: soLuong,
                    fill: true,
                    backgroundColor: 'rgba(255, 206, 86, 0.6)',
                    borderColor: "rgba(75,192,192,1)",
                }
            ]
        })
    }, [data])


    return (
        <div className="bangdulieufake" style={{ paddingTop: '10px' }}>
            <div className="bangdulieufake-header">
                <h5>Doanh thu sản phẩm</h5>
            </div>
            <Bar
                data={chartData}
                options={{
                    title: {
                        display: true,
                        fontSize: 25
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    },
                }}
            />
        </div>
    );
}

