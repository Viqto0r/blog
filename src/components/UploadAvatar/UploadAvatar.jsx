import { memo } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Upload } from 'antd'
import { Controller } from 'react-hook-form'

const UploadAvatar = ({ control, avatar = { fileList: [] }, onRemove }) => {
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <Controller
      control={control}
      name='avatar'
      render={({ field: { value, ...otherHandlers } }) => (
        <Upload
          name='avatar'
          listType='picture-circle'
          className='avatar-uploader'
          fileList={avatar.fileList}
          showUploadList={{
            showRemoveIcon: true,
            showPreviewIcon: false,
            showDownloadIcon: false,
          }}
          action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
          {...otherHandlers}
          onRemove={onRemove}
        >
          {!avatar.fileList.length && uploadButton}
        </Upload>
      )}
    />
  )
}
export default memo(UploadAvatar)
