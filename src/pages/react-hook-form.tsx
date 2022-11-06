import type { NextPage } from "next"
import Head from "next/head"

import { useForm, type SubmitHandler } from "react-hook-form"
import { useUser } from "@auth0/nextjs-auth0"
import { useState } from "react"



const ReactHookFormPage: NextPage = () => {
    // const { user, error, isLoading } = useUser()

    // if (error) {
    //     console.log(`ReactHookFormPage user object error: ${error}`)

    //     return <div>
    //         error: {error.message}
    //         <pre>
    //             {JSON.stringify(error, null, 4)}
    //         </pre>
    //     </div>
    // }


    // const zxcv = trpc.video.asdfGetUserStuff.useQuery()

    // console.log(`ReactHookFormPage zxcv: ${JSON.stringify(zxcv, null, 4)}`)

    // if (zxcv.isError) {
    //     return <div>
    //         error: {zxcv.error.message}
    //         <pre>
    //             {JSON.stringify(zxcv.error, null, 4)}
    //         </pre>
    //     </div>
    // }


    return (
        <>
            <Head>
                <title>React-Hook-Form test</title>
            </Head>

            <h1>React-Hook-Form test</h1>

            {/* <div className="my-12">
                {zxcv.isSuccess && <ExampleForm {...zxcv.data} />}
            </div> */}

        </>
    )

}


function ExampleForm(formData: any) {
    // const { video } = trpc.useContext()
    const [asdfSubmitFeedback, setAsdfSubmitFeedback] = useState({status: 0, statusText: ''})

    type Inputs = {
        asdfTitle: string,
        asdfContent: string,
    }

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>(
        {
            defaultValues: {
                asdfTitle: formData.title,
                asdfContent: formData.content,
            }
        }
    )



    const onSubmit: SubmitHandler<Inputs> = async asdfNewData => {
        console.log(`ExampleForm SubmitHandler asdfNewData: ${JSON.stringify(asdfNewData, null, 4)}`)

        // const asdfUpdated = await video.asdfUpdate.fetch({
        //     id: formData.record_id,
        //     title: asdfNewData.asdfTitle,
        //     content: asdfNewData.asdfContent,
        // }).then((response) => {
        //     console.log(`ExampleForm SubmitHandler response: ${JSON.stringify(response, null, 4)}`)
        //     setAsdfSubmitFeedback({status: response.status, statusText: response.statusText})
        // }).catch((error) => {
        //     console.log(`ExampleForm SubmitHandler error: ${JSON.stringify(error, null, 4)}`)
        //     setAsdfSubmitFeedback({status: error.data.httpStatus, statusText: error.message})
        // })

        // console.log(`ExampleForm SubmitHandler COMPLETE asdfUpdated: ${JSON.stringify(asdfUpdated, null, 4)}`)

        // setAsdfSubmitFeedback(asdfUpdated)

    }



    // console.log(watch("asdfTitle"))



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">

                <label className="input-group">
                    <span>ID</span>
                    <input type="text" defaultValue={formData.record_id} className="input input-bordered disabled" disabled />
                </label>

                <label className="input-group">
                    <span>Title</span>
                    <input {...register("asdfTitle")} className="input input-bordered" />
                </label>

                <label className="input-group">
                    <span className={errors.asdfContent && 'alert-warning'}>Content</span>
                    <input {...register("asdfContent", { required: true })} className="input input-bordered" />

                </label>


                {asdfSubmitFeedback && asdfSubmitFeedback.status > 0 && <div className={`alert alert-${asdfSubmitFeedback?.status === 200 ? 'success' : 'error'} mt-4`}>{asdfSubmitFeedback.status}: {asdfSubmitFeedback.statusText}</div>}

                <input type="submit" className="btn bg-opacity-20 mt-4" />
            </div>
        </form>
    )
}



export default ReactHookFormPage
