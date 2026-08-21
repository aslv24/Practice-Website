import DashboardBackLink from "@/components/layout/DashboardBackLink"
import SingleFileUpload from "@/components/modules/fileupload/FileUpload"
import FileUpload from "@/components/modules/fileupload/InputFileUpload"

export default function FileUploadPage() {
  return (
    <div className="file-upload-page">
      <h1 className="file-upload-page__title">File Upload Practice Page</h1>

      <p className="file-upload-page__description">
        Practice file upload scenarios for Selenium automation
      </p>

      <DashboardBackLink />

      <div className="file-upload-page__content">
        <SingleFileUpload />
        <FileUpload />
      </div>
    </div>
  )
}