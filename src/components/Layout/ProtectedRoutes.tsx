import useAuthStore from "@/store/useAuthStore";

export default function ProtectedRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthStore();

  const baseStyle = "pt-8 mx-auto max-w-7xl px-4";

  if (!user) {
    return <main className={baseStyle}>Please Login</main>;
  }
  return <main className={baseStyle}>{children}</main>;
}
