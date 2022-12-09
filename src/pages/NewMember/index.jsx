import Layout from "../../components/Layout";
import MemberForm from "../../components/MemberForm";
import MembersService from "../../services/MembersService";

export default function NewMember() {
  async function handleSubmit(formData) {
    formData;
    try {
      const member = {
        name: formData.name,
        birthDate: formData.birthDate,
        username: formData.username,
        cpf: formData.cpf,
        rg: formData.rg,
        passport: formData.passport || null,
        phone: formData.phone,
        lsdEmail: formData.emailLsd,
        email: formData.email,
        secondaryEmail: formData.secondEmail,
        memberType: formData.memberType,
        lattes: formData.lattes,
        roomName: formData.room,
        isBrazilian: formData.isBrazilian,
        hasKey: formData.hasKey,
      };

      await MembersService.create(member);
      alert("Formulario enviado");
    } catch (err) {
      alert(err);
    }
  }
  return (
    <Layout>
      <MemberForm onSubmit={handleSubmit} typeLabel="Novo membro" buttonLabel="Cadastrar" />
    </Layout>
  );
}
