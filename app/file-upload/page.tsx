import DashboardBackLink from "@/components/layout/DashboardBackLink"
import SingleInputUpload from "@/components/modules/fileupload/SingleInputUpload"
import MultipleInputUpload from "@/components/modules/fileupload/MultipleInputUpload"
import NoInputSingleUpload from "@/components/modules/fileupload/NoInputSingleUpload"
import NoInputMultipleUpload from "@/components/modules/fileupload/NoInputMultipleUpload"
import FileDownload from "@/components/modules/fileupload/FileDownload"

export default function FileUploadPage() {
  return (
    <main
      id="file-upload-page"
      data-testid="file-upload-page"
      aria-label="File upload and download practice page"
      className="file-upload-page"
    >
      <div className="file-upload-page__header">
        <h1
          id="file-upload-page-title"
          data-testid="file-upload-page-title"
          className="file-upload-page__title"
        >
          Files Practice Page
        </h1>

        <p
          id="file-upload-page-description"
          data-testid="file-upload-page-description"
          className="file-upload-page__description"
        >
          Practice single/multiple file uploads with standard &lt;input&gt;, dropzone interactions without inputs, and file download assertions for Selenium and Playwright
        </p>

        <DashboardBackLink />
      </div>

      <section
        id="file-upload-modules-section"
        data-testid="file-upload-modules-section"
        aria-label="File upload and download practice modules"
        className="file-upload-page__content"
      >
        <SingleInputUpload />
        <MultipleInputUpload />
        <NoInputSingleUpload />
        <NoInputMultipleUpload />
        <FileDownload />
      </section>
    </main>
  )
}