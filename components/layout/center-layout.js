export default function CenterLayout({ children, activePage }) {
  return (
    <>
      {/* 置中 & 背景色 */}
      <main className="flex flex-col justify-center items-center bg-white">
        {/* 主要容器 */}
        <div className="bg-white container justify-center flex flex-col items-center columns-12 px-5 sm:mt-8 md:mt-0 sm:mb-10 md:px-0  my-4">
          {children}
        </div>
      </main>
    </>
  )
}
