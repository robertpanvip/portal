📦 **Installation**
``` javascript
npm install component-portal
```
🔨 **Usage**
``` javascript
class Test extends React.PureComponent {

    state = {
    };
    ref=React.createRef<HTMLDivElement>()
    render() {
        const {} = this.state;
        return (
            <div>
                <Portal getContainer={()=>this.ref.current}>123</Portal>
                <div ref={this.ref}>456</div>
                <div id='container'>789</div>
                <Portal getContainer={'#container'}>123</Portal>
            </div>
        );
    }
}


```
