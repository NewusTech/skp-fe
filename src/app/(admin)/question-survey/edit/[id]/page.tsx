import InputComponent from '@/components/custom/inputComponent'
import TitleLabel from '@/components/custom/TitleHeader'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

const EditSurveyQuestion = () => {
    return (
        <div>
            <TitleLabel label='Edit Pertanyaan Survey' />
            {/*  */}
            <form className="mt-10">
                <div className="bg-[#F7F7F7] p-5 rounded-xl flex flex-col gap-4">
                    <div className="font-semibold text-xl mb-2">
                        Survey Kepuasan Pegawai
                    </div>
                    <InputComponent title='Pertanyaan' isVertical>
                        <Textarea
                            placeholder='Pertanyaan'
                        />
                    </InputComponent>
                    <div className="flex justify-end">
                        <Button
                            className='w-[150px]'
                        >
                            Simpan
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditSurveyQuestion