"use client"
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
// import { useGetKota, useGetProvinsi, useGetUserProfileId } from '@/services/api';
import Cookies from "js-cookie";
import { showAlert } from '@/lib/swalAlert';
// import { profileEdit, profileEditFormData } from '@/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import Loading from '@/components/ui/Loading';
import { SelectInput } from '@/components/custom/selectInput';
import HelperError from '@/components/ui/HelperError';
import { profileFormSchema, ProfileFormSchema } from '@/components/(user)/profile/validations';
// import { CustomSelect } from '@/components/Custom/SelectCustom';
// import SelectSearch from '@/components/Custom/SelectSearch3';
// import { mutate } from 'swr';
import { useModal } from "@/hooks/modal";



const Profile = () => {
  const modal = useModal();
  // const [profileImage, setProfileImage] = useState<string>('/assets/images/profile.png');
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm<ProfileFormSchema>({
    resolver: zodResolver(profileFormSchema),
  });

  const [slug, setSlug] = useState<string | undefined>(undefined);

  useEffect(() => {
    setSlug(Cookies.get("slug"));
  }, []);

  // kelamin
  const kelaminOptions = [
    { label: "Laki-laki", value: 1 },
    { label: "Perempuan", value: 2 },
  ];

  // // Integrasi API
  // const { data: dataUser } = useGetUserProfileId(slug as string);
  // // provinsi
  // const { data: dataProvinsi } = useGetProvinsi();
  // const transformedItems = dataProvinsi?.data.map((item) => ({
  //     value: item.id.toString(), // Ensure id is a string if needed
  //     label: item.name, // Map 'name' to 'nama'
  // })) || [];
  // // kota
  // const { data: dataKota } = useGetKota();
  // const kotaItems = dataKota?.data.map((item) => ({
  //     value: item.id.toString(), // Ensure id is a string if needed
  //     label: item.name, // Map 'name' to 'nama'
  // })) || [];

  // useEffect(() => {
  //     if (dataUser?.data) {
  //         const timer = setTimeout(() => {
  //             setValue("name", dataUser?.data?.name ?? '');
  //             setValue("email", dataUser?.data?.email ?? '');
  //             setValue("telepon", dataUser?.data?.telepon ?? '');
  //             setValue("alamat", dataUser?.data?.alamat ?? '');
  //             setValue("tempat_lahir", dataUser?.data?.tempat_lahir ?? '');
  //             // setValue("tgl_lahir", dataUser?.data?.tgl_lahir ?? '');
  //             setValue("gender", dataUser?.data?.gender?.toString() ?? '');
  //             setValue("asal_instansi", dataUser?.data?.asal_instansi ?? '');
  //             setValue("provinsi_id", dataUser?.data?.provinsi_id || 0);
  //             setValue("kota_id", dataUser?.data?.kota_id || 0);

  //             if (dataUser?.data?.image_profile) {
  //                 setImagePreviewMain(dataUser?.data?.image_profile);
  //             }
  //         }, 1000); // Delay in milliseconds (1000 ms = 1 second)

  //         return () => clearTimeout(timer); // Clean up timeout on component unmount or when dataUser changes
  //     }
  // }, [dataUser, setValue]);
  // GET ONE SLUG

  // main logo
  const [imagePreviewMain, setImagePreviewMain] = useState<string | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('image_profile', file);
      setImagePreviewMain(URL.createObjectURL(file));
    }
  };
  // main logo

  // 
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();
  const axiosPrivate = useAxiosPrivate();

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log("data = ", data)
  };

  // const onSubmit: SubmitHandler<profileEditFormData> = async (data) => {
  //     setLoading(true); // Set loading to true when the form is submitted
  //     const formData = new FormData();
  //     formData.append('name', data.name);
  //     formData.append('email', data.email);
  //     formData.append('telepon', data.telepon);
  //     formData.append('alamat', data.alamat);
  //     formData.append('provinsi_id', data.provinsi_id.toString());
  //     formData.append('kota_id', data.kota_id.toString());
  //     formData.append('tempat_lahir', data.tempat_lahir);
  //     // formData.append('tgl_lahir', data.tgl_lahir);
  //     formData.append('gender', data.gender.toString());
  //     formData.append('asal_instansi', data.asal_instansi);

  //     // Memeriksa jika image ada sebelum menambahkannya ke formData
  //     if (data.image_profile) {
  //         formData.append('image_profile', data.image_profile);
  //     }

  //     try {
  //         await axiosPrivate.put(`/user/info/update/${slug}`, formData, {
  //             headers: {
  //                 'Content-Type': 'multipart/form-data',
  //             },
  //         });
  //         // console.log(data);
  //         // alert
  //         showAlert('success', 'Data berhasil diperbarui!');
  //         // alert
  //         // navigate.push('/data-master/about-company');
  //         // reset();
  //     } catch (error: any) {
  //         // Extract error message from API response
  //         const errorMessage = error.response?.data?.data?.[0]?.message || error.response?.data?.message || 'Gagal memperbarui data!';
  //         showAlert('error', errorMessage);
  //     } finally {
  //         setLoading(false); // Set loading to false once the process is complete
  //     }
  //     mutate(`/user/info/get/${slug}`);
  // };


  return (
    <div>
      <div className="text-srBlack overflow-x-hidden min-h-screen">
        <div className="wrap-alll container mx-auto">
          <div className="md:text-2xl text-xl font-semibold my-4 text-primary">
            Profile
          </div>
          {/* Profile Section */}
          <form onSubmit={handleSubmit(onSubmit)} className="wrap rounded-[20px] bg-[#FCFBFB] border border-gray-100 md:p-7 p-4 shadow-md mb-10 flex flex-col gap-5">
            <div className="profile flex justify-center">
              <div className="h-[125px] w-[125px] rounded-full overflow-hidden relative border border-primary">
                <Image
                  src={imagePreviewMain ?? "/assets/images/user-profil.png"}
                  alt="profile"
                  width={500}
                  height={500}
                  unoptimized
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-[42px]">
                  <label htmlFor="profileImageInput" className="cursor-pointer bg-primary text-white px-2 py-1 text-xs rounded-md">
                    Edit
                  </label>
                  <input
                    id="profileImageInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>
            <div className="form md:px-7 flex flex-col md:gap-3 gap-2 mt-4">
              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-7">
                <div className="flex flex-col md:gap-3 gap-2">
                  <Label>Nama</Label>
                  <Input
                    placeholder="Nama"
                    type='text'
                    {...register('nama')}
                    className={`${errors.nama ? 'border-red-500' : ''}`}
                  />
                  <HelperError>{errors?.nama?.message}</HelperError>
                </div>
                <div className="flex flex-col md:gap-3 gap-2">
                  <Label>NIP</Label>
                  <Input
                    placeholder="NIP"
                    type='text'
                    {...register('nip')}
                    className={`${errors.nip ? 'border-red-500' : ''}`}
                  />
                  <HelperError>{errors?.nip?.message}</HelperError>
                </div>
              </div>
              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-7">
                <div className="flex flex-col md:gap-3 gap-2">
                  <Label>Usia</Label>
                  <Input
                    placeholder="Usia"
                    type='text'
                    {...register('usia')}
                    className={`${errors.usia ? 'border-red-500' : ''}`}
                  />
                  <HelperError>{errors?.usia?.message}</HelperError>
                </div>
                <div className="flex flex-col md:gap-3 gap-2">
                  <Label>Jenis Kelamin</Label>
                  <Controller
                    name="jenisKelamin"
                    control={control}
                    render={({ field }) => (
                      <SelectInput
                        label="Pilih Jenis Kelamin"
                        options={kelaminOptions}
                        placeholder="Pilih Jenis Kelamin"
                        value={field.value}
                        onChange={(option) => field.onChange(option || '')}
                        width={`w-full ${errors.jenisKelamin ? 'border-red-500' : ''}`}
                      />
                    )}
                  />
                  <HelperError>{errors?.email?.message}</HelperError>
                </div>
              </div>
              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-7">
                <div className="flex flex-col md:gap-3 gap-2">
                  <Label>Jabatan / Posisi</Label>
                  <Input
                    placeholder="Jabatan / Posisi"
                    type='text'
                    {...register('jabatan')}
                    className={`${errors.jabatan ? 'border-red-500' : ''}`}
                  />
                  <HelperError>{errors?.jabatan?.message}</HelperError>
                </div>
                <div className="flex flex-col md:gap-3 gap-2">
                  <Label>Jenis Ketenagaan</Label>
                  <Controller
                    name="jenisKetenagaan"
                    control={control}
                    render={({ field }) => (
                      <SelectInput
                        label="Pilih Jenis Ketenagaan"
                        options={kelaminOptions}
                        placeholder="Pilih Jenis Ketenagaan"
                        value={field.value}
                        onChange={(option) => field.onChange(option || '')}
                        width={`w-full ${errors.jenisKetenagaan ? 'border-red-500' : ''}`}
                      />
                    )}
                  />
                  <HelperError>{errors?.email?.message}</HelperError>
                </div>
              </div>
              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-7">
                <div className="flex flex-col md:gap-3 gap-2">
                  <Label>Pendidikan Terakhir</Label>
                  <Controller
                    name="pendidikanTerakhir"
                    control={control}
                    render={({ field }) => (
                      <SelectInput
                        label="Pilih Pendidikan Terakhir"
                        options={kelaminOptions}
                        placeholder="Pilih Pendidikan Terakhir"
                        value={field.value}
                        onChange={(option) => field.onChange(option || '')}
                        width={`w-full ${errors.pendidikanTerakhir ? 'border-red-500' : ''}`}
                      />
                    )}
                  />
                  <HelperError>{errors?.email?.message}</HelperError>
                </div>
                <div className="flex flex-col md:gap-3 gap-2">
                  <Label>Masa Kerja</Label>
                  <Input
                    placeholder="Masa Kerja"
                    type='text'
                    {...register('masaKerja')}
                    className={`${errors.masaKerja ? 'border-red-500' : ''}`}
                  />
                  <HelperError>{errors?.masaKerja?.message}</HelperError>
                </div>
              </div>
              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-7">
                <div className="flex flex-col md:gap-3 gap-2">
                  <Label>Email</Label>
                  <Input
                    placeholder="Email"
                    type='text'
                    {...register('email')}
                    className={`${errors.email ? 'border-red-500' : ''}`}
                  />
                  <HelperError>{errors?.email?.message}</HelperError>
                </div>
                <div className="flex flex-col md:gap-3 gap-2">
                  <Label>Nomor Telepon</Label>
                  <Input
                    placeholder="Nomor Telepon"
                    type='number'
                    {...register('nomorTelepon')}
                    className={`${errors.nomorTelepon ? 'border-red-500' : ''}`}
                  />
                  <HelperError>{errors?.nomorTelepon?.message}</HelperError>
                </div>
              </div>
              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-7">
                <div className="flex flex-col md:gap-3 gap-2">
                  <Label>Provinsi</Label>
                  <Controller
                    name="provinsi"
                    control={control}
                    render={({ field }) => (
                      <SelectInput
                        label="Pilih Provinsi"
                        options={kelaminOptions}
                        placeholder="Pilih Provinsi"
                        value={field.value}
                        onChange={(option) => field.onChange(option || '')}
                        width={`w-full ${errors.provinsi ? 'border-red-500' : ''}`}
                      />
                    )}
                  />
                  <HelperError>{errors?.provinsi?.message}</HelperError>
                </div>
                <div className="flex flex-col md:gap-3 gap-2">
                  <Label>Kabupaten</Label>
                  <Controller
                    name="kabupaten"
                    control={control}
                    render={({ field }) => (
                      <SelectInput
                        label="Pilih Kabupaten"
                        options={kelaminOptions}
                        placeholder="Pilih Kabupaten"
                        value={field.value}
                        onChange={(option) => field.onChange(option || '')}
                        width={`w-full ${errors.kabupaten ? 'border-red-500' : ''}`}
                      />
                    )}
                  />
                  <HelperError>{errors?.kabupaten?.message}</HelperError>
                </div>
              </div>
              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-7">
                <div className="flex flex-col md:gap-3 gap-2">
                  <Label>Kecamatan</Label>
                  <Controller
                    name="kecamatan"
                    control={control}
                    render={({ field }) => (
                      <SelectInput
                        label="Pilih Kecamatan"
                        options={kelaminOptions}
                        placeholder="Pilih Kecamatan"
                        value={field.value}
                        onChange={(option) => field.onChange(option || '')}
                        width={`w-full ${errors.kecamatan ? 'border-red-500' : ''}`}
                      />
                    )}
                  />
                  <HelperError>{errors?.kecamatan?.message}</HelperError>
                </div>
                <div className="flex flex-col md:gap-3 gap-2">
                  <Label>Desa</Label>
                  <Controller
                    name="desa"
                    control={control}
                    render={({ field }) => (
                      <SelectInput
                        label="Pilih Desa"
                        options={kelaminOptions}
                        placeholder="Pilih Desa"
                        value={field.value}
                        onChange={(option) => field.onChange(option || '')}
                        width={`w-full ${errors.desa ? 'border-red-500' : ''}`}
                      />
                    )}
                  />
                  <HelperError>{errors?.desa?.message}</HelperError>
                </div>
              </div>
              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-7">
                <div className="flex flex-col md:gap-3 gap-2">
                  <Label>RT</Label>
                  <Input
                    placeholder="RT"
                    type='text'
                    {...register('rt')}
                    className={`${errors.rt ? 'border-red-500' : ''}`}
                  />
                  <HelperError>{errors?.rt?.message}</HelperError>
                </div>
                <div className="flex flex-col md:gap-3 gap-2">
                  <Label>RW</Label>
                  <Input
                    placeholder="RW"
                    type='text'
                    {...register('rw')}
                    className={`${errors.rw ? 'border-red-500' : ''}`}
                  />
                  <HelperError>{errors?.rw?.message}</HelperError>
                </div>
              </div>

              {/* Form Fields alamat*/}
              <div className="flex flex-col md:gap-3 gap-2">
                <Label>Alamat</Label>
                <Textarea
                  placeholder="Alamat"
                  {...register('alamat')}
                  className={`${errors.alamat ? 'border-red-500' : ''}`}
                />
                <HelperError>{errors?.alamat?.message}</HelperError>
              </div>
              {/* Submit Button */}
              <div className="flex justify-center gap-5 md:gap-3 md:my-5 my-3">
                <Button
                  type="button"
                  variant="outlinePrimary"
                  className="rounded-full w-full md:w-[180px] font-normal"
                  onClick={() => modal.onOpen("reset-password")}
                >
                  Ganti Kata Sandi
                </Button>
                <Button
                  type='submit'
                  className="px-10 w-full md:w-[180px]">
                  {loading ? <Loading /> : "Simpan"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
