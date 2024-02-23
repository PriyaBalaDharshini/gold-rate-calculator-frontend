import React, { useState } from 'react';
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import info from '../data.json';
import Button from 'react-bootstrap/Button';

function Chart() {
    const [startIndex, setStartIndex] = useState(0);
    const dataPerPage = 10;
    const endIndex = startIndex + dataPerPage;
    const dataToShow = info.slice(startIndex, endIndex);

    const handlePrevious = () => {
        if (startIndex >= dataPerPage) {
            setStartIndex(startIndex - dataPerPage);
        }
    };

    const handleNext = () => {
        if (endIndex < info.length) {
            setStartIndex(startIndex + dataPerPage);
        }
    };

    return (
        <div className='chart'>
            <BarChart width={700} height={400} data={dataToShow}>
                <XAxis dataKey="date" />
                <YAxis dataKey="rate" />
                <Tooltip />
                <Legend />
                <Bar dataKey="rate" fill="#8884d8" />
            </BarChart>
            <div className="buttons">
                <Button className='button' variant="info" onClick={handlePrevious}>Previous</Button>
                <Button className='button' variant="info" onClick={handleNext}>Next</Button>
            </div>
        </div>
    );
}

export default Chart;
