import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Loading } from "../../screen";
const Profile = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [provinces, setProvinces] = React.useState();
    const [districts, setDistricts] = React.useState();
    const [wards, setWards] = React.useState();
    const user = useSelector((state) => state.user);
    const [addressSelected, setAddressSelected] = React.useState({
        province: user.provinceCode,
        district: user.districtCode,
        ward: user.wardCode,
    });
    React.useEffect(() => {
        setIsLoading(true);
        if (!provinces) {
            axios
                .get("https://provinces.open-api.vn/api/?depth=1")
                .then((response) => {
                    setProvinces(response.data);
                })
                .catch((error) => console.log(error));
        }
        if (addressSelected.province) {
            axios
                .get(
                    `https://provinces.open-api.vn/api/p/${addressSelected.province}?depth=2`,
                )
                .then((response) => {
                    setDistricts(response.data.districts);
                })
                .catch((error) => console.log(error));
        }
        if (addressSelected.district) {
            axios
                .get(
                    `https://provinces.open-api.vn/api/d/${addressSelected.district}?depth=2`,
                )
                .then((response) => {
                    setWards(response.data.wards);
                })
                .catch((error) => console.log(error));
        }
        setIsLoading(false);
    }, [addressSelected, provinces]);

    if (isLoading) return <Loading />;
    else {
        return (
            <div className='row g-4'>
                <div className='col-12 col-md-9'>
                    <div className='row'>
                        <div className='col'>
                            <label htmlFor='provinces' className='form-label'>
                                Tỉnh/Thành phố
                            </label>
                            <select
                                id='provinces'
                                className='form-select mb-3'
                                aria-label='example'
                                value={addressSelected.province || ""}
                                onChange={(e) => {
                                    setAddressSelected({
                                        province: e.target.value,
                                    });
                                    setDistricts();
                                    setWards();
                                }}
                            >
                                <option value=''>Tỉnh/Thành phố</option>
                                {provinces?.map((province) => (
                                    <option
                                        key={province.code}
                                        value={province.code}
                                    >
                                        {province.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='col'>
                            <label htmlFor='districts' className='form-label'>
                                Quận/Huyện
                            </label>
                            <select
                                id='districts'
                                className='form-select mb-3'
                                aria-label='example'
                                value={addressSelected.district || ""}
                                onChange={(e) => {
                                    setAddressSelected((prevAddress) => ({
                                        ...prevAddress,
                                        district: e.target.value,
                                    }));
                                    setWards();
                                }}
                            >
                                <option value=''>Quận/Huyện</option>
                                {districts?.map((district) => (
                                    <option
                                        key={district.code}
                                        value={district.code}
                                    >
                                        {district.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='col'>
                            <label htmlFor='wards' className='form-label'>
                                Phường/Xã
                            </label>
                            <select
                                id='wards'
                                className='form-select mb-3'
                                aria-label='example'
                                value={addressSelected.ward || ""}
                                onChange={(e) =>
                                    setAddressSelected((prevAddress) => ({
                                        ...prevAddress,
                                        ward: e.target.value,
                                    }))
                                }
                            >
                                <option value=''>Phường/Xã</option>
                                {wards?.map((ward) => (
                                    <option key={ward.code} value={ward.code}>
                                        {ward.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className='col-12 col-md-3'>
                    <div className='d-flex flex-column align-items-center'>
                        <div className='ratio ratio-100x100 rounded-circle overflow-hidden'>
                            <img
                                src='/images/demo.jpg'
                                alt=''
                                className='object-fit-cover'
                            />
                        </div>
                        <button>Upload</button>
                    </div>
                </div>
            </div>
        );
    }
};

export default Profile;
