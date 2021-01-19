import { useState } from "react";

export default function Home() {
  const [familyName, setFamilyName] = useState("");
  const [husbandIncome, setHusbandIncome] = useState({
    netIncome: "",
    childBenefits: "",
    totalIncome: ""
  });
  // const [husbandTotalIncome, setHusbandTotalIncome] = useState("");
  const [wifeIncome, setWifeIncome] = useState({
    netIncome: "",
    childBenefits: "",
    totalIncome: ""
  });
  // const [wifeTotalIncome, setWifeTotalIncome] = useState("");
  // const [totalIncomeTogether, setTotalIncomeTogether] = useState("");
  const [inputList, setInputList] = useState([{ childName: "", childAge: "" }]);
  const [sumOfTheoreticalCost, setSumOfTheoreticalCost] = useState("");
  const [directCost, setDirectCost] = useState("");
  const [realGrossCost, setRealGrossCost] = useState("")
  const [realGrossCostChildBenefits, setRealGrossCostChildBenefits] = useState("")
  const [residenceCostHusb, setResidenceCostHusb] = useState("");
  const [residenceCostWfe, setResidenceCostWfe] = useState("");
  const [residenceRateDivisionPercent, setResidenceRateDivisionPercent] = useState({husbandPercent: "",wifePercent: ""})

  // FINAL AMOUNTS
  const [husbandFinalAmt, setHusbandFinalAmt] = useState({contri_1: "", contri_2: ""})
  const [wifeFinalAmt, setWifeFinalAmt] = useState({contri_1: "", contri_2: ""})

  // ALL THEORETICAL COST BY AGE
  const theoreticalCostByAge = {
    0: 0.137,
    1: 0.144,
    2: 0.152,
    3: 0.159,
    4: 0.166,
    5: 0.173,
    6: 0.181,
    7: 0.188,
    8: 0.196,
    9: 0.204,
    10: 0.21,
    11: 0.218,
    12: 0.225,
    13: 0.233,
    14: 0.24,
    15: 0.247,
    16: 0.255,
    17: 0.262,
    18: 0.27,
    19: 0.28,
    20: 0.29,
    21: 0.3,
    22: 0.31,
    23: 0.32,
    24: 0.33,
    25: 0.34,
  };
  // HANDLE INPUT FIELD OF CHILDRENS'
  const onChangeChildrenData = (e, index) => {
    const { name, value } = e.target;
    const childrenList = [...inputList];
    childrenList[index][name] = value;
    setInputList(childrenList);
  };

  // ADD CHILD FUNCTTION
  const addChild = () => {
    setInputList([...inputList, { childName: "", childAge: "" }]);
  };

  // REMOVE CHILD FUNCTION 
  const removeChild = (index) => {
    const childrenList = [...inputList];
    childrenList.splice(index, 1);
    setInputList(childrenList);
  };

  const handleSubmit = () => {
    // B21 = SOM(B15 : B19)
    /////////////////////////////////////
    // CALCULATION SUM OF THEORETICAL COST OF ALL CHILDREN
    let totalCost = 0;
    let i;
    let listLength = inputList.length;

    for (i = 0; i < listLength; i++) {
      totalCost += theoreticalCostByAge[inputList[i].childAge];
    }
    setSumOfTheoreticalCost(totalCost);
    /////////////////////////////////////
    // B7 = B3 + B4
    let husbandTotalIncome = Number(husbandIncome.netIncome) + Number(husbandIncome.childBenefits);
    console.log(husbandTotalIncome, "husbandTotalIncome", typeof husbandTotalIncome);

    // C7 = C3 + C4
    let wifeTotalIncome = Number(wifeIncome.netIncome) + Number(wifeIncome.childBenefits);
    console.log(wifeTotalIncome, "wifeTotalIncome");

    // B9 = B7 + C7
    let totalIncome = husbandTotalIncome + wifeTotalIncome;
    console.log(totalIncome, "totalIncome");

    // B11 = 1 / (B9 - C4 - B4) * B7
    let husbandPercentage = 1/(totalIncome - wifeIncome.childBenefits - husbandIncome.childBenefits) * husbandTotalIncome;
    console.log(husbandPercentage, "husbandPercentage");

    // C11 = 1 / (B9 - C4 - B4) * C3
    let wifePercentage = 1/(totalIncome - wifeIncome.childBenefits - husbandIncome.childBenefits) * wifeTotalIncome;
    console.log(wifePercentage, "wifePercentage");

    // D21 = B21 / (1 + B21)
    let directCostVal = Number(totalCost) / (1 + Number(totalCost));
    setDirectCost(directCostVal)
    console.log(directCostVal, "directCostVal");

    // B23 = B9 * D21
    let realCostGross = totalIncome * directCostVal;
    console.log(realCostGross, "realCostGross");
    setRealGrossCost(realCostGross);

    // B24 = B23 - (B4 + C4)
    let realCostChildBenefits = realCostGross - (Number(husbandIncome.childBenefits) + Number(wifeIncome.childBenefits));
    console.log(realCostChildBenefits, "realCostChildBenefits");
    setRealGrossCostChildBenefits(realCostChildBenefits);

    // B30 = B24 * B11
    let diffInHusbandIncome = realCostChildBenefits * husbandPercentage;
    console.log(diffInHusbandIncome, "diffInHusbandIncome");

    // B31 = B24 * C11
    let diffInWifeIncome = realCostChildBenefits * wifePercentage;
    console.log(diffInWifeIncome, "diffInWifeIncome")

    // B36
    let residenceHusbandPercent = residenceRateDivisionPercent.husbandPercent/100;
    console.log(residenceHusbandPercent, "residenceHusbandPercent");

    // C36
    let residenceWifePercent = residenceRateDivisionPercent.wifePercent/100;
    console.log(residenceWifePercent, "residenceWifePercent")

    // B37 = B23 * B36
    let residenceCostHusband =  realCostGross * residenceHusbandPercent;
    console.log(residenceCostHusband, "residenceCostHusband")
    setResidenceCostHusb(residenceCostHusband)

    // C37 = B23 * C36
    let residenceCostWife = realCostGross * residenceWifePercent;
    console.log(residenceCostWife, "residenceCostWife")
    setResidenceCostWfe(residenceCostWife)

    // = B30 - B37
    let husbandFinalContri_1 = diffInHusbandIncome - residenceCostHusband;
    console.log(husbandFinalContri_1,"husbandFinalContri_1", typeof husbandFinalContri_1)

    //  = B29 + B4
    let husbandFinalContri_2 = husbandFinalContri_1 + Number(husbandIncome.childBenefits);
    console.log(husbandFinalContri_2, "husbandFinalContri_2")

    // = B31 - C37
    let wifeFinalContri_1 = diffInWifeIncome - residenceCostWife;
    console.log(wifeFinalContri_1, "wifeFinalContri_1")

    // = B40 + C4
    let wifeFinalContri_2 = wifeFinalContri_1 + Number(wifeIncome.childBenefits);
    console.log(wifeFinalContri_2, "wifeFinalContri_2")

    setHusbandFinalAmt({contri_1: husbandFinalContri_1, contri_2: husbandFinalContri_2});
    setWifeFinalAmt({contri_1: wifeFinalContri_1, contri_2: wifeFinalContri_2});
    // setHusbandIncome({...husbandIncome, totalIncome: husbandTotalIncome});
    // setWifeIncome({...wifeIncome, totalIncome: wifeTotalIncome});
    // setTotalIncomeTogether(totalIncome);
    // setDirectCost(directCostVal);

  };
  return (
    <>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-between">
        <a className="navbar-brand" href="/#">
          RENARD
        </a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a href="/#" className="nav-link">
              About Us
            </a>
          </li>
          <li className="nav-item">
            <a href="/#" className="nav-link">
              Contact Us
            </a>
          </li>
        </ul>
      </nav>
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <div className="card customCard_style p-5 border-0">
            <h2 className="card-title text-center py-5">Renard Calculation</h2>
            <div className="row my-3">
              <div className="col align-self-end">
                <p><strong>Net annual Income:</strong></p>
              </div>
              <div className="col">
                <p className="text-center"><strong>Husband</strong></p>
                <input
                  className="form-control"
                  type="number"
                  value={husbandIncome.netIncome}
                  name="husbandNetIncome"
                  onChange={(e) => setHusbandIncome({...husbandIncome,netIncome:e.target.value})}
                />
              </div>
              <div className="col">
                <p className="text-center"><strong>Wife</strong></p>
                <input
                  className="form-control"
                  type="number"
                  value={wifeIncome.netIncome}
                  name="wifeNetIncome"
                  onChange={(e) => setWifeIncome({...wifeIncome,netIncome:e.target.value})}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col"><p><strong>Child benefits:</strong></p></div>
              <div className="col">
                <input
                  className="form-control"
                  type="number"
                  value={husbandIncome.childBenefits}
                  name="husbandChildBenefits"
                  onChange={(e) => setHusbandIncome({...husbandIncome,childBenefits:e.target.value})}
                />
              </div>
              <div className="col">
                <input
                  className="form-control"
                  type="number"
                  value={wifeIncome.childBenefits}
                  name="wifeChildBenefits"
                  onChange={(e) => setWifeIncome({...wifeIncome,childBenefits:e.target.value})}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col"><p><strong>Residence rate division ( in %):</strong></p></div>
              <div className="col">
                <input
                  className="form-control"
                  type="number"
                  value={residenceRateDivisionPercent.husbandPercent}
                  name="husbandResidencePercent"
                  onChange={(e) => setResidenceRateDivisionPercent({...residenceRateDivisionPercent,husbandPercent:e.target.value})}
                />
              </div>
              <div className="col">
                <input
                  className="form-control"
                  type="number"
                  value={residenceRateDivisionPercent.wifePercent}
                  name="wifeResidencePercent"
                  onChange={(e) => setResidenceRateDivisionPercent({...residenceRateDivisionPercent,wifePercent:e.target.value})}
                />
              </div>
            </div>
            {inputList.map((val, i) => (
              <div className="row" key={i}>
                <div className="col-md-5">
                  <label>Child Name</label>
                  <input
                    className="form-control"
                    type="text"
                    value={val.childName}
                    name="childName"
                    onChange={(e) => onChangeChildrenData(e, i)}
                  />
                </div>
                <div className="col-md-5">
                  <label>Child Age</label>
                  <input
                    className="form-control"
                    type="number"
                    value={val.childAge}
                    name="childAge"
                    onChange={(e) => onChangeChildrenData(e, i)}
                  />
                </div>
                <div className="col-md-2 align-self-end">
                  {i === inputList.length - 1 ? (
                    <button
                      className="btn btn-success mr-3"
                      onClick={addChild}
                    >
                      +
                    </button>
                  ) : (
                    <></>
                  )}

                  {inputList.length > 1 ? (
                    <button
                      className="btn btn-danger"
                      onClick={() => removeChild(i)}
                    >
                      &times;
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ))}
              <h5 className="my-3"><strong>Children Details:</strong> </h5>
              <div className="row">
                <div className="col"><p><strong>Child Name</strong></p></div>
                <div className="col"><p><strong>Child Age</strong></p></div>
                <div className="col"><p><strong>Theoretical Cost</strong></p></div>
              </div>
              {inputList.map(val=>(
                <div className="row">
                  <div className="col">{val.childName}</div>
                  <div className="col">{val.childAge}</div>
                  <div className="col">{theoreticalCostByAge[val.childAge]}</div>
                </div>
              ))}
              <hr/>
              <h5 className="my-3"><strong>Total Theoretical Cost:</strong> {sumOfTheoreticalCost}</h5>
              <hr/>
              <h5 className="my-3"><strong>Direct Cost:</strong> {directCost} </h5>
              <hr/>
              <h5 className="my-3"><strong>Real Cost Gross:</strong> {realGrossCost} </h5>
              <hr/>
              <h5 className="my-3"><strong>Real Cost Gross( in Child Benefits):</strong> {realGrossCostChildBenefits} </h5>
              <hr/>
              <h5 className="my-3"><strong>Residence Cost:</strong> </h5>
              <div className="row">
                <div className="col"><p><strong>Father/Husband:</strong></p></div>
                <div className="col">{residenceCostHusb}</div>
              </div>
              <div className="row">
                <div className="col"><p><strong>Mother/Wife:</strong></p></div>
                <div className="col">{residenceCostWfe}</div>
              </div>
              <hr/>
              <h5 className="my-3"><strong>Final Amounts:</strong> </h5>
              <div className="row">
                <div className="col"><p><strong>Father/Husband:</strong></p></div>
                {/* <div className="col">{husbandFinalAmt.contri_1}</div> */}
                <div className="col">{husbandFinalAmt.contri_2}</div>
              </div>
              <div className="row">
                <div className="col"><p><strong>Mother/Wife:</strong></p></div>
                {/* <div className="col">{wifeFinalAmt.contri_1}</div> */}
                <div className="col">{wifeFinalAmt.contri_2}</div>
              </div>
            <button className="btn btn-outline-primary" onClick={handleSubmit}>Calculate</button>
          </div>
        </div>
      </div>
    </>
  );
}
