import { memo } from 'react'
import { Image, Spin } from 'antd'
import useImageSrc from '../../hooks/useImgSrc'

const _Image = ({ path }) => {
  const [src, loading, setLoading] = useImageSrc(path)
  return (
    <div style={{ position: 'relative' }}>
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        >
          <Spin size='large' />
        </div>
      )}
      <Image
        style={{
          minHeight: '300px',
          height: '300px',
          opacity: 0,
          transition: '0.1s opacity ease',
          objectFit: 'cover',
        }}
        alt='example'
        src={src}
        preview={false}
        onLoad={({ target }) => {
          setLoading(false)
          target.style.opacity = '1'
        }}
      />
    </div>
  )
}

export default memo(_Image)
