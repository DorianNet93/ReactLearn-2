const animals = [
  {type: `turtle`, icon: `🐢`},
  {type: `octopus`, icon: `🐙`},
  {type: `fish`, icon: `🐠`},
  {type: `flamingo`, icon: `🦩`},
  {type: `penguin`, icon: `🐧`}
];

const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);

class App extends React.Component {
  constructor(props) {
    super(props);

    const interval = setInterval(() => {
      const { arr, usedIndex } = this.state;
      const randomIndex = this.getRandomIndex(arr, usedIndex);
      if (randomIndex !== -1) {
        const newArr = [...arr];
        const randomObj = newArr[randomIndex];
        
        if (!randomObj.active) {
          newArr[randomIndex] = this.addKeyAndValue(randomObj, "active", true);
          usedIndex.push(randomIndex);
          this.setState({ arr: newArr, usedIndex }, () => {console.log(this.state.arr)});
        }
      } else {
        clearInterval(interval);
        console.log('Интервал остановлен');
      }
    }, 2000);
  }

  state = {
    color: 'black',
    border: 'transparent',
    arr: this.props.list,
    usedIndex: [],
    interval: null,
    borderWidth: '',
    borderStyle: '',
    borderColor: 'transparent'
  };

  getRandomIndex = (arr, usedIndex) => {
    const availableIndex = arr
      .map((_, index) => index)
      .filter(index => !usedIndex.includes(index));

    if (availableIndex.length === 0) { return -1 }

    const randomIndex = availableIndex[Math.floor(Math.random() * availableIndex.length)];

    return randomIndex;
  }

  addKeyAndValue = (obj, key, value) => {
    return { ...obj, [key]: value };
  }

  render() {
    const { arr=[], color='', borderWidth, borderColor='', borderStyle='' } = this.state;

    const activeCount = arr.filter(el => el.active).length;

    const tableBorderWidth = activeCount === arr.length ? '20px' : (activeCount >= arr.length / 2 ? '10px' : borderWidth);
    const tableBorderStyle = activeCount >= arr.length / 2 ? 'solid' : borderStyle;
    const tableBorderColor = activeCount >= arr.length / 2 ? 'black' : borderColor;

    return (
      arr.length  
      ?  <table style={{borderWidth: tableBorderWidth, borderStyle: tableBorderStyle, borderColor: tableBorderColor}}>
          <tbody className="table__body" >
            {arr.map((el, i) =>
              <tr className="element__table" key={i} style={{color: el.active ? 'green' : null}}>
                <td>{el.type}: </td>
                <td>{el.icon}</td>
              </tr>
            )}
          </tbody>
        </table>
      : null
    );
  }
}

root.render(<App list={animals}/>);