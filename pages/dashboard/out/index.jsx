import { Header } from "../../../src/components/Header";
import { Meta } from "../../../src/components/Meta";
import protectedRoute from "../../../src/components/ProtectedRoute";

function Out() {
  return (
    <>
      <Meta title="Out" />
      <Header />
      <div>Out</div>
    </>
  )
}
export default protectedRoute(Out);
