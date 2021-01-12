import React, { Component } from 'react';
import ReadOnlyInput from './components/ReadOnlyInput.js';
import Bar from './components/Bar.js';
import { calculateSalaryFrom } from './salary.js';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: 1,
    };
  }

  handleInputChange = (event) => {
    const newFullSalary = Number(event.target.value);

    this.setState({
      fullSalary: newFullSalary,
    });
  };

  render() {
    const { fullSalary } = this.state;
    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    const dataSalary = calculateSalaryFrom(fullSalary);
    const {
      baseINSS,
      baseIRPF,
      discountINSS,
      discountIRPF,
      netSalary,
    } = dataSalary;

    const percentageINSS = ((discountINSS / fullSalary) * 100).toFixed(2);
    const percentageIRPF = ((discountIRPF / fullSalary) * 100).toFixed(2);
    const percentageNetSalary = ((netSalary / fullSalary) * 100).toFixed(2);

    return (
      <div className="container">
        <h1 className="center">React Salário</h1>
        <div className="row">
          <div className="col s12">
            <label>
              <span>Salário Bruto</span>
              <input
                autoFocus
                type="number"
                value={fullSalary}
                onChange={this.handleInputChange}
              ></input>
            </label>
          </div>

          <div className="col s3">
            <ReadOnlyInput
              label="Base INSS:"
              value={formatter.format(baseINSS)}
              color="#000000"
            />
          </div>

          <div className="col s3">
            <ReadOnlyInput
              label="Desconto INSS:"
              value={`${formatter.format(discountINSS)} (${percentageINSS}%)`}
              color="#e67e22"
            />
          </div>

          <div className="col s3">
            <ReadOnlyInput
              label="Base IRPF:"
              value={formatter.format(baseIRPF)}
              color="#000000"
            />
          </div>

          <div className="col s3">
            <ReadOnlyInput
              label="Desconto IRPF:"
              value={`${formatter.format(discountIRPF)} (${percentageIRPF}%)`}
              color="#c0392b"
            />
          </div>

          <div className="col s3">
            <ReadOnlyInput
              label="Salário líquido: "
              value={`${formatter.format(netSalary)} (${percentageNetSalary}%)`}
              color="#16a085"
            />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Bar value={percentageINSS} color="#e67e22" />
          <Bar value={percentageIRPF} color="#c0392b" />
          <Bar value={percentageNetSalary} color="#16a085" />
        </div>
      </div>
    );
  }
}
