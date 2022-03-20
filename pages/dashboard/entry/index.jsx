import { Header } from "../../../src/components/Header";
import { Meta } from "../../../src/components/Meta";
import protectedRoute from "../../../src/components/ProtectedRoute";
function Entry() {
  return (
    <>
      <Meta title="Entry" />
      <Header />
      <div>Entry</div>
    </>
  )
}
export default protectedRoute(Entry);
