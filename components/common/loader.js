import Loading from '@/assets/loading-css.svg'
export default function Loader() {
  // return <Loading />
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center bg-white">
        <Loading height={300} />
      </div>
    </>
  )
}
