import DashboardBackLink from "@/components/layout/DashboardBackLink"
import SingleFileUpload from "@/components/modules/fileupload/FileUpload"
import FileUpload from "@/components/modules/fileupload/InputFileUpload"

export default function FileUploadPage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-6">
      <h1 className="mb-2 text-3xl font-bold">File Upload Practice Page</h1>

      <p className="mb-4 text-gray-600">
        Practice file upload scenarios for Selenium automation
      </p>

      <DashboardBackLink />

      <div className="mt-6 w-full max-w-2xl space-y-6">
        <SingleFileUpload />
        <FileUpload />
      </div>
    </div>
  )
}
