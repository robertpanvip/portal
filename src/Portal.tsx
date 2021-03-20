import * as React from 'react';
import ReactDOM from 'react-dom';
import raf from 'raf';

export type GetContainer = string | HTMLElement | (() => HTMLElement);

const getParent = (getContainer: GetContainer) => {
    if (getContainer) {
        if (typeof getContainer === 'string') {
            return document.querySelectorAll(getContainer)[0];
        }
        if (typeof getContainer === 'function') {
            return getContainer();
        }
        if (
            typeof getContainer === 'object' &&
            getContainer instanceof window.HTMLElement
        ) {
            return getContainer;
        }
    }
    return document.body;
};

export interface PortalProps {
    getContainer?: GetContainer;
    children: React.ReactNode;
}

class Portal extends React.PureComponent<PortalProps> {
    private container: HTMLElement;
    private rafId: number;

    /**
     * 组件挂载后
     */
    componentDidMount(): void {
        const {
            getContainer
        } = this.props;

        this.rafId = raf(() => {
            this.container = getParent(getContainer) as HTMLElement;
            this.forceUpdate();
        });
    }

    /**
     * 组件卸载
     */
    componentWillUnmount(): void {
        raf.cancel(this.rafId);
    }

    /**
     * 渲染子节点
     * **/
    renderChildren(): React.ReactNode {
        const {children} = this.props;
        return typeof children === "function" ? children(this.container) : children
    }

    /**
     * 渲染函数
     */
    render(): React.ReactNode {

        return this.container ?
            ReactDOM.createPortal(this.renderChildren(), this.container)
            : null
    }
}

export default Portal;
