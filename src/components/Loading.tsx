interface ILoadingProps {
  center?: boolean
}

const Loading: React.FC<ILoadingProps> = ({ center = true }) => {
  return <div className={center ? 'loading loading-center' : 'loading'}></div>
}

export default Loading
