import { Component } from 'react';

// Isolates a WebGL-heavy child (raw canvas / three.js scene) from the rest of
// the page. Context creation or renderer construction can throw on low-end
// devices, exhausted context limits, or driver issues — without this, that
// throw would unmount the entire Landing tree. On error this just renders
// nothing instead, leaving the rest of the page (text, options, cursor) intact.
export default class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.warn('WebGL component failed to render, disabling it:', error);
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}
