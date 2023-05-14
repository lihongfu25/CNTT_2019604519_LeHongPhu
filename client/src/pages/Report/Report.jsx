import React from "react";
import { Spinner } from "../../components";
import { useForm } from "react-hook-form";
import moment from "moment";
import "./report.scss";
import notify from "../../config/toast";
import axiosClient, { BASE_URL } from "../../config/api";
import { useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const Report = () => {
    const projects = useSelector((state) => state.project);
    const [isLoading, setIsLoading] = React.useState(false);
    const [data, setData] = React.useState(null);
    const [dataChart, setDataChart] = React.useState(null);
    const [filterProject, setFilterProject] = React.useState(projects[0]?.projectId);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
        clearErrors,
    } = useForm();

    React.useEffect(() => {
        clearErrors();
        const fromDate = moment().subtract(7, "days").format("YYYY-MM-DD");
        const toDate = moment().format("YYYY-MM-DD");
        setValue("from", fromDate);
        setValue("to", toDate);
    }, [setValue, clearErrors]);

    const getDataChart = (data) => {
        let value = data.statuses.map((item) => ({
            label: item.status.name,
        }));
        const issues = data.issues;
        value = value.map((item) => {
            let count = 0;
            issues.forEach((issue) => {
                if (issue.status.name === item.label) {
                    count++;
                }
            });
            return {
                ...item,
                data: count,
            };
        });
        const dataChart = {
            labels: value.map((item) => item.label),
            datasets: [
                {
                    label: "# of Count",
                    data: value.map((item) => item.data),
                    backgroundColor: ["rgb(119, 119, 119)", "rgb(75, 192, 192)", "rgb(255, 51, 51)", "rgb(54, 162, 235)", "rgb(0, 168, 38)", "rgb(153, 102, 255)"],
                },
            ],
        };
        setDataChart(dataChart);
    };

    const countIssue = (userId, statusId) => {
        const count = data.project.issues.filter((item) => item.assigneeId === userId && item.statusId === statusId).length;
        return count;
    };

    const onSubmit = async (data) => {
        const fromDate = moment(data.from);
        const toDate = moment(data.to).add(1, "days");
        if (toDate.diff(fromDate, "days") < 0) {
            setError("from", {
                type: "invalid",
            });
            setError("to", {
                type: "invalid",
            });
        } else {
            setIsLoading(true);
            try {
                const res = await axiosClient.post("statistical", {
                    from: fromDate,
                    to: toDate,
                    projectId: filterProject,
                });
                setData(res.data.data);
                getDataChart(res.data.data.project);
            } catch (error) {
                notify("error", error.response.data.message);
            }
            setIsLoading(false);
        }
    };
    return (
        <div className='report h-100 d-flex flex-column'>
            <div className='report__heading d-flex flex-column mb-2'>
                <div>
                    <p className='fs-4 fw-2 color-10 mb-2'>Thống kê</p>
                </div>
                <form action='' onSubmit={handleSubmit(onSubmit)}>
                    <div className='d-inline-block'>
                        <div className='d-flex'>
                            <div className='w-50 me-3'>
                                <div className='d-flex'>
                                    <label htmlFor='select-project' className='col-form-label fs-7 me-3 text-nowrap'>
                                        Dự án:
                                    </label>
                                    <div className=''>
                                        <select className='form-select w-215 fs-7' value={filterProject} onChange={(e) => setFilterProject(e.target.value)} id='select-project' name='projectId'>
                                            {projects.map((project) => (
                                                <option value={project.projectId} key={project.projectId}>
                                                    {project.name + " - " + project.shortName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='w-50 me-3'>
                                <div className='d-flex flex-column'>
                                    <div className='d-flex'>
                                        <label htmlFor='select-project' className='col-form-label fs-7 me-3'>
                                            Từ:
                                        </label>
                                        <div className='flex-grow-1'>
                                            <input
                                                type='date'
                                                className={`form-control w-215 fs-7 ${errors.from && "is-invalid"}`}
                                                id='from'
                                                {...register("from", {
                                                    required: true,
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        {errors.from?.type === "required" && <div className='form-text text-danger fs-7'>Vui lòng chọn ngày bắt đầu thống kê</div>}
                                        {errors.from?.type === "invalid" && <div className='form-text text-danger fs-7'>Khoảng thời gian đã chọn không phù hợp</div>}
                                    </div>
                                </div>
                            </div>
                            <div className='w-50'>
                                <div className='d-flex flex-column'>
                                    <div className='d-flex'>
                                        <label htmlFor='select-priority' className='col-form-label fs-7 me-3'>
                                            Đến:
                                        </label>
                                        <div className='flex-grow-1'>
                                            <input
                                                type='date'
                                                className={`form-control w-215 fs-7 ${errors.to && "is-invalid"}`}
                                                id='to'
                                                placeholder='to'
                                                {...register("to", {
                                                    required: true,
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        {errors.to?.type === "required" && <div className='form-text text-danger fs-7'>Vui lòng chọn ngày kết thúc thống kê</div>}
                                        {errors.to?.type === "invalid" && <div className='form-text text-danger fs-7'>Khoảng thời gian đã chọn không phù hợp</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='d-inline-flex ms-3'>
                        <button className='btn--color-1 px-4 h-35'>Xem</button>
                    </div>
                </form>
            </div>
            {isLoading ? (
                <div className='d-flex justify-content-center align-items-center flex-grow-1'>
                    <Spinner />
                </div>
            ) : !data ? (
                ""
            ) : (
                <div className='h-vh-75 overflow-scroll hidden-scrollBar'>
                    <div className='row g-4 mt-1'>
                        <div className='col-8'>
                            <div className='d-flex align-items-center h-100'>
                                <div className='row g-4'>
                                    <div className='col-6'>
                                        <div className='d-flex flex-column bg-color-5 p-3 rounded-6 shadow-sm border-start border-5 border-color-new'>
                                            <p className='fs-5 mb-0'>Tạo mới</p>
                                            <p className='fs-7 mb-0'>{data?.issueCreate?.length}</p>
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <div className='d-flex flex-column bg-color-5 p-3 rounded-6 shadow-sm border-start border-5 border-color-progress'>
                                            <p className='fs-5 mb-0'>Đang thực hiện</p>
                                            <p className='fs-7 mb-0'>{data?.issueProgress?.length}</p>
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <div className='d-flex flex-column bg-color-5 p-3 rounded-6 shadow-sm border-start border-5 border-color-review'>
                                            <p className='fs-5 mb-0'>Chờ review</p>
                                            <p className='fs-7 mb-0'>{data?.issueReview?.length}</p>
                                        </div>
                                    </div>
                                    <div className='col-6'>
                                        <div className='d-flex flex-column bg-color-5 p-3 rounded-6 shadow-sm border-start border-5 border-color-done'>
                                            <p className='fs-5 mb-0'>Hoàn thành</p>
                                            <p className='fs-7 mb-0'>{data?.issueDone?.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div>{dataChart && <Pie data={dataChart} />}</div>
                        </div>
                    </div>
                    <div className='bg-color-5'>
                        <table className='table'>
                            <thead className='table-light'>
                                <tr>
                                    <th scope='col' className='fs-7 col-4 text-start p-3'>
                                        Họ và Tên
                                    </th>
                                    {data.project.statuses.map((item) => (
                                        <th key={item.id} scope='col' className='fs-7 col-2 text-center py-3'>
                                            {item.status.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.users.map((item, i) => (
                                    <tr key={i} className='align-middle'>
                                        <td className='px-3'>
                                            <div className='d-flex'>
                                                <div className='ratio ratio-40x40 rounded-circle overflow-hidden'>
                                                    <img src={BASE_URL + item.user.photoUrl} alt='' className='w-100 object-fit-cover' />
                                                </div>
                                                <div className='d-flex flex-column align-items-start justify-content-center flex-grow-1 ms-2'>
                                                    <span className='fs-7'>{item.user.fullName || item.user.email}</span>
                                                    {item.user.username && <span className='fs-8 color-3'>{item.user.username}</span>}
                                                </div>
                                            </div>
                                        </td>
                                        {data.project.statuses.map((element, index) => (
                                            <td className='text-center' key={index}>
                                                {countIssue(item.userId, element.statusId)}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Report;
