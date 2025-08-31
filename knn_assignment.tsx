import React, { useState } from 'react';

const KNNAssignment = () => {
  // Training data
  const trainingData = [
    { student: 1, x1: 1.0, x2: 5.0, y: 0, label: 'Fail' },
    { student: 2, x1: 2.0, x2: 5.5, y: 0, label: 'Fail' },
    { student: 3, x1: 3.0, x2: 6.0, y: 0, label: 'Fail' },
    { student: 4, x1: 4.5, x2: 5.0, y: 0, label: 'Fail' },
    { student: 5, x1: 5.0, x2: 6.5, y: 1, label: 'Pass' },
    { student: 6, x1: 5.5, x2: 7.0, y: 1, label: 'Pass' },
    { student: 7, x1: 6.0, x2: 6.0, y: 1, label: 'Pass' },
    { student: 8, x1: 7.0, x2: 7.0, y: 1, label: 'Pass' },
    { student: 9, x1: 8.0, x2: 6.0, y: 1, label: 'Pass' },
    { student: 10, x1: 9.0, x2: 7.5, y: 1, label: 'Pass' }
  ];

  // New student data
  const newStudent = { x1: 4, x2: 6 };

  // Calculate Euclidean distances
  const calculateDistance = (x1, x2, newX1, newX2) => {
    return Math.sqrt(Math.pow(x1 - newX1, 2) + Math.pow(x2 - newX2, 2));
  };

  // Add distances to training data
  const dataWithDistances = trainingData.map(student => ({
    ...student,
    distance: calculateDistance(student.x1, student.x2, newStudent.x1, newStudent.x2)
  }));

  // Sort by distance and get k=3 nearest neighbors
  const sortedByDistance = [...dataWithDistances].sort((a, b) => a.distance - b.distance);
  const k3Neighbors = sortedByDistance.slice(0, 3);
  const k5Neighbors = sortedByDistance.slice(0, 5);

  // Predictions
  const k3Prediction = k3Neighbors.reduce((sum, neighbor) => sum + neighbor.y, 0) >= 2 ? 1 : 0;
  const k5Prediction = k5Neighbors.reduce((sum, neighbor) => sum + neighbor.y, 0) >= 3 ? 1 : 0;

  // Scatter plot component
  const ScatterPlot = () => {
    const width = 500;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 60, left: 60 };
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;

    // Scale functions
    const xScale = (x) => ((x - 0.5) / 9) * plotWidth;
    const yScale = (y) => plotHeight - ((y - 4.5) / 3.5) * plotHeight;

    return (
      <div className="bg-white p-4 rounded-lg border">
        <h3 className="text-lg font-bold mb-4">1. Scatter Plot (10 points)</h3>
        <svg width={width} height={height} className="border">
          {/* Grid lines */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(x => (
            <line
              key={`vgrid-${x}`}
              x1={margin.left + xScale(x)}
              y1={margin.top}
              x2={margin.left + xScale(x)}
              y2={height - margin.bottom}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}
          {[5, 6, 7, 8].map(y => (
            <line
              key={`hgrid-${y}`}
              x1={margin.left}
              y1={margin.top + yScale(y)}
              x2={width - margin.right}
              y2={margin.top + yScale(y)}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}

          {/* Axes */}
          <line
            x1={margin.left}
            y1={height - margin.bottom}
            x2={width - margin.right}
            y2={height - margin.bottom}
            stroke="black"
            strokeWidth="2"
          />
          <line
            x1={margin.left}
            y1={margin.top}
            x2={margin.left}
            y2={height - margin.bottom}
            stroke="black"
            strokeWidth="2"
          />

          {/* Data points */}
          {trainingData.map((student) => (
            <g key={student.student}>
              {student.y === 0 ? (
                // Circle for Fail
                <circle
                  cx={margin.left + xScale(student.x1)}
                  cy={margin.top + yScale(student.x2)}
                  r="8"
                  fill="#3b82f6"
                  stroke="#1e40af"
                  strokeWidth="2"
                />
              ) : (
                // Square for Pass
                <rect
                  x={margin.left + xScale(student.x1) - 8}
                  y={margin.top + yScale(student.x2) - 8}
                  width="16"
                  height="16"
                  fill="#ef4444"
                  stroke="#dc2626"
                  strokeWidth="2"
                />
              )}
              <text
                x={margin.left + xScale(student.x1)}
                y={margin.top + yScale(student.x2) - 12}
                textAnchor="middle"
                fontSize="10"
                fill="black"
              >
                {student.student}
              </text>
            </g>
          ))}

          {/* New student point (star) */}
          <g>
            <polygon
              points={`${margin.left + xScale(newStudent.x1)},${margin.top + yScale(newStudent.x2) - 10} ${margin.left + xScale(newStudent.x1) + 3},${margin.top + yScale(newStudent.x2) - 3} ${margin.left + xScale(newStudent.x1) + 10},${margin.top + yScale(newStudent.x2) - 3} ${margin.left + xScale(newStudent.x1) + 4},${margin.top + yScale(newStudent.x2) + 2} ${margin.left + xScale(newStudent.x1) + 6},${margin.top + yScale(newStudent.x2) + 10} ${margin.left + xScale(newStudent.x1)},${margin.top + yScale(newStudent.x2) + 6} ${margin.left + xScale(newStudent.x1) - 6},${margin.top + yScale(newStudent.x2) + 10} ${margin.left + xScale(newStudent.x1) - 4},${margin.top + yScale(newStudent.x2) + 2} ${margin.left + xScale(newStudent.x1) - 10},${margin.top + yScale(newStudent.x2) - 3} ${margin.left + xScale(newStudent.x1) - 3},${margin.top + yScale(newStudent.x2) - 3}`}
              fill="#fbbf24"
              stroke="#f59e0b"
              strokeWidth="2"
            />
            <text
              x={margin.left + xScale(newStudent.x1)}
              y={margin.top + yScale(newStudent.x2) - 15}
              textAnchor="middle"
              fontSize="10"
              fill="black"
              fontWeight="bold"
            >
              New
            </text>
          </g>

          {/* Axis labels */}
          <text
            x={width / 2}
            y={height - 10}
            textAnchor="middle"
            fontSize="14"
            fontWeight="bold"
          >
            Hours Studied (X₁)
          </text>
          <text
            x={15}
            y={height / 2}
            textAnchor="middle"
            fontSize="14"
            fontWeight="bold"
            transform={`rotate(-90, 15, ${height / 2})`}
          >
            Sleep Hours (X₂)
          </text>

          {/* Axis numbers */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(x => (
            <text
              key={`xlabel-${x}`}
              x={margin.left + xScale(x)}
              y={height - margin.bottom + 15}
              textAnchor="middle"
              fontSize="12"
            >
              {x}
            </text>
          ))}
          {[5, 6, 7, 8].map(y => (
            <text
              key={`ylabel-${y}`}
              x={margin.left - 10}
              y={margin.top + yScale(y) + 4}
              textAnchor="middle"
              fontSize="12"
            >
              {y}
            </text>
          ))}
        </svg>
        
        <div className="mt-4 flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-blue-700"></div>
            <span>Fail (0)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 border-2 border-red-700"></div>
            <span>Pass (1)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-400 border-2 border-yellow-600" style={{clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'}}></div>
            <span>New Student</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">KNN Assignment Solution</h1>
      
      <ScatterPlot />

      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-bold mb-4">2. Euclidean Distance Calculations (10 points)</h3>
        <p className="mb-4">For new student: X₁ = 4, X₂ = 6</p>
        <p className="mb-4">Formula: d = √[(X₁ - 4)² + (X₂ - 6)²]</p>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Student</th>
                <th className="border border-gray-300 p-2">Hours Studied (X₁)</th>
                <th className="border border-gray-300 p-2">Sleep Hours (X₂)</th>
                <th className="border border-gray-300 p-2">Pass/Fail (Y)</th>
                <th className="border border-gray-300 p-2">Distance Calculation</th>
                <th className="border border-gray-300 p-2">Euclidean Distance</th>
              </tr>
            </thead>
            <tbody>
              {dataWithDistances.map((student, index) => (
                <tr key={student.student} className={k3Neighbors.includes(student) ? 'bg-yellow-100' : ''}>
                  <td className="border border-gray-300 p-2 text-center">{student.student}</td>
                  <td className="border border-gray-300 p-2 text-center">{student.x1}</td>
                  <td className="border border-gray-300 p-2 text-center">{student.x2}</td>
                  <td className="border border-gray-300 p-2 text-center">{student.y}</td>
                  <td className="border border-gray-300 p-2 text-center">
                    √[({student.x1} - 4)² + ({student.x2} - 6)²]
                  </td>
                  <td className="border border-gray-300 p-2 text-center font-mono">
                    {student.distance.toFixed(3)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded">
          <h4 className="font-bold">Step-by-step calculations:</h4>
          <div className="mt-2 space-y-1 text-sm font-mono">
            {dataWithDistances.map(student => (
              <div key={student.student}>
                Student {student.student}: √[({student.x1} - 4)² + ({student.x2} - 6)²] = √[{Math.pow(student.x1 - 4, 2).toFixed(2)} + {Math.pow(student.x2 - 6, 2).toFixed(2)}] = √{(Math.pow(student.x1 - 4, 2) + Math.pow(student.x2 - 6, 2)).toFixed(2)} = {student.distance.toFixed(3)}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-bold mb-4">3. Find the 3 Nearest Neighbors (3 points)</h3>
        <p className="mb-4">Sorting by distance (smallest to largest):</p>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Rank</th>
                <th className="border border-gray-300 p-2">Student</th>
                <th className="border border-gray-300 p-2">Hours Studied (X₁)</th>
                <th className="border border-gray-300 p-2">Sleep Hours (X₂)</th>
                <th className="border border-gray-300 p-2">Pass/Fail (Y)</th>
                <th className="border border-gray-300 p-2">Euclidean Distance</th>
              </tr>
            </thead>
            <tbody>
              {sortedByDistance.map((student, index) => (
                <tr key={student.student} className={index < 3 ? 'bg-green-100 font-bold' : ''}>
                  <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
                  <td className="border border-gray-300 p-2 text-center">{student.student}</td>
                  <td className="border border-gray-300 p-2 text-center">{student.x1}</td>
                  <td className="border border-gray-300 p-2 text-center">{student.x2}</td>
                  <td className="border border-gray-300 p-2 text-center">{student.y}</td>
                  <td className="border border-gray-300 p-2 text-center font-mono">{student.distance.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 p-4 bg-green-50 rounded">
          <h4 className="font-bold">The 3 Nearest Neighbors are:</h4>
          <ul className="mt-2">
            {k3Neighbors.map((neighbor, index) => (
              <li key={neighbor.student}>
                {index + 1}. Student {neighbor.student}: Distance = {neighbor.distance.toFixed(3)}, Outcome = {neighbor.y} ({neighbor.label})
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-bold mb-4">4. Majority Vote (2 points)</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-blue-50 rounded">
            <h4 className="font-bold mb-2">For k = 3:</h4>
            <p>Nearest neighbors outcomes:</p>
            <ul className="mt-2">
              {k3Neighbors.map(neighbor => (
                <li key={neighbor.student}>Student {neighbor.student}: {neighbor.y} ({neighbor.label})</li>
              ))}
            </ul>
            <p className="mt-3 font-bold">
              Pass votes: {k3Neighbors.filter(n => n.y === 1).length}<br/>
              Fail votes: {k3Neighbors.filter(n => n.y === 0).length}
            </p>
            <p className="mt-2 text-lg font-bold text-blue-600">
              Prediction: {k3Prediction === 1 ? 'PASS' : 'FAIL'} ({k3Prediction})
            </p>
          </div>

          <div className="p-4 bg-purple-50 rounded">
            <h4 className="font-bold mb-2">For k = 5 (bonus):</h4>
            <p>Nearest neighbors outcomes:</p>
            <ul className="mt-2">
              {k5Neighbors.map(neighbor => (
                <li key={neighbor.student}>Student {neighbor.student}: {neighbor.y} ({neighbor.label})</li>
              ))}
            </ul>
            <p className="mt-3 font-bold">
              Pass votes: {k5Neighbors.filter(n => n.y === 1).length}<br/>
              Fail votes: {k5Neighbors.filter(n => n.y === 0).length}
            </p>
            <p className="mt-2 text-lg font-bold text-purple-600">
              Prediction: {k5Prediction === 1 ? 'PASS' : 'FAIL'} ({k5Prediction})
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-lg font-bold mb-4">5. Discussion Questions (5 points)</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">1. What was your final prediction?</h4>
            <p className="mt-1">
              Using k = 3, the prediction is <strong>{k3Prediction === 1 ? 'PASS' : 'FAIL'}</strong>. 
              The 3 nearest neighbors are Students {k3Neighbors.map(n => n.student).join(', ')}, 
              with {k3Neighbors.filter(n => n.y === 1).length} Pass votes and {k3Neighbors.filter(n => n.y === 0).length} Fail votes.
              Since {k3Neighbors.filter(n => n.y === 1).length > k3Neighbors.filter(n => n.y === 0).length ? 'Pass votes outnumber Fail votes' : 'Fail votes outnumber Pass votes'}, 
              the student is predicted to {k3Prediction === 1 ? 'pass' : 'fail'}.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold">2. How would the prediction change if we used k = 5 instead of k = 3?</h4>
            <p className="mt-1">
              With k = 5, we would consider the 5 nearest neighbors: Students {k5Neighbors.map(n => n.student).join(', ')}.
              This gives us {k5Neighbors.filter(n => n.y === 1).length} Pass votes and {k5Neighbors.filter(n => n.y === 0).length} Fail votes.
              The prediction would be <strong>{k5Prediction === 1 ? 'PASS' : 'FAIL'}</strong>.
              {k3Prediction !== k5Prediction ? 
                ' This is different from k=3, showing how the choice of k can affect the prediction.' : 
                ' This is the same as k=3, indicating the prediction is robust for these k values.'}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border">
        <h4 className="font-bold mb-2">Summary:</h4>
        <p>
          A new student who studied <strong>4 hours</strong> and slept <strong>6 hours</strong> will 
          <strong className={k3Prediction === 1 ? 'text-green-600' : 'text-red-600'}>
            {k3Prediction === 1 ? ' PASS' : ' FAIL'}
          </strong> the exam (using k = 3).
        </p>
      </div>
    </div>
  );
};

export default KNNAssignment;