import styled from 'styled-components';

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = ({ children }: LayoutProps) => {
  return <LayoutStyle>{children}</LayoutStyle>;
};
const LayoutStyle = styled.main`
  width: 100%;
  margin: 0 auto;
  // padding: 10px 25px;
  min-height: 100vh;
`;
export default Layout;
