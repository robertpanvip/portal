import * as React from 'react';
import Portal from "../src/Portal";

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
            </div>
        );
    }
}

/***
 *
 * @constructor
 */
export default function App(): React.ReactElement<HTMLElement> {
    return (
        <div className="app">
          <Test/>
        </div>
    )
}
