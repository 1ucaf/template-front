import { useEffect } from "react";
import { useAuthContext } from "../../lib/hooks/contextHooks/useAuthContext";

const Logout = () => {
  const { logout } = useAuthContext();
  useEffect(() => {
    logout();
  }, []);
  return (
    <div>Logout</div>
  )
}

export default Logout