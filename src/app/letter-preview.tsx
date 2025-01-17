import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { t } from "@/lib/translations"
import type { FormData, TemplateSection } from "@/types"
import { MalayLetterTemplate, EnglishLetterTemplate } from "@/lib/letter-templates"
import { LetterExport } from "./letter-export"
import Image from "next/image"
import "@/styles/letter.css"

interface LetterPreviewProps {
  language: "malay" | "english"
  formData: FormData
  templateSections: TemplateSection[]
}

export function LetterPreview({
  language,
  formData,
  templateSections,
}: LetterPreviewProps) {
  return (
    <Card className="border-2 border-dashed border-gray-300">
      <CardHeader>
        <CardTitle>{t("previewTitle", language)}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-50 px-2 py-4 rounded-lg">
          <div className="bg-white shadow-lg p-8">
            <div id="letter-content" className="w-full max-w-[24cm] mx-auto bg-white mb-4 [&_*]:text-sm">
              <div className="space-y-6">
                {language === "malay" ? (
                  <MalayLetterTemplate data={formData} sections={templateSections} />
                ) : (
                  <EnglishLetterTemplate data={formData} sections={templateSections} />
                )}
                {formData.signatureType === "digital" && (
                  <>
                    {formData.signature ? (
                      <div className="signature">
                        <Image 
                          src={formData.signature}
                          alt="signature"
                          width={120}
                          height={60}
                          className="mix-blend-multiply"
                          unoptimized
                        />
                        <div>
                          ({formData.parentName.trim() ? formData.parentName : t("placeholderParentName", language)})
                        </div>
                      </div>
                    ) : (
                      <div className="signature">
                        <div className="placeholder">
                          {t("placeholderSignature", language)}
                        </div>
                        <div>
                          ({formData.parentName.trim() ? formData.parentName : t("placeholderParentName", language)})
                        </div>
                      </div>
                    )}
                  </>
                )}
                {formData.signatureType === "manual" && (
                  <div className="signature">
                    <div className="h-[60px]"></div>
                    <div>
                      ({formData.parentName.trim() ? formData.parentName : t("placeholderParentName", language)})
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <LetterExport 
            language={language}
            formData={formData}
          />
        </div>
      </CardContent>
    </Card>
  )
} 