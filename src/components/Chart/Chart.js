import React, {useEffect, useState} from "react";
import {Line} from "react-chartjs-2";
import useSWR from "swr";
import "./Chart.css";

const endpoint =  "http://www.json-generator.com/api/json/get/bUgMRhYjKG?indent=2"
const Chart = () => {

    const [saleData, setSaleData] = useState({});
    const [quantityData, setQuantityData] = useState({});
    const { data, error } =useSWR(endpoint)

    const saleCount = data && data.graphData.map(a => a.saleCount)
    const equity = data && data.graphData.map(a => a.equity)
    const quantity = data && data.graphData.map(a => a.quantity)
    const date = data && data.graphData.map(a => a.date)

    useEffect(() => {
        if(!data) return;
        setSaleData({
            labels: date,
            datasets: [
                {
                    label: "#SaleCount",
                    data: saleCount,
                    fill: false,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgba(255, 99, 132, 0.2)',
                },
            ],
        })
        setQuantityData({
            labels: date,
            datasets: [
                {
                    label: "#Quentity",
                    data: quantity,
                    fill: false,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgba(255, 99, 132, 0.2)',
                },
            ],
        })
    }, [data])


    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };


    return(
        <div className="chart">
            <div>
                <Line data={saleData} options={{responsive: true}} />
            </div>
            <div>
                <Line data={quantityData} options={{responsive: true}} />
            </div>
        </div>
    )
}

export default Chart;