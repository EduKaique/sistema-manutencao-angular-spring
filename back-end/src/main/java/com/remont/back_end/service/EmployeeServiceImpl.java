package com.remont.back_end.service;

import com.remont.back_end.dto.EmployeeDTO;
import com.remont.back_end.model.Employee;
import com.remont.back_end.model.User;
import com.remont.back_end.repository.EmployeeRepository;
import com.remont.back_end.repository.UserRepository;
import com.remont.back_end.exception.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final UserRepository userRepository; 
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public EmployeeServiceImpl(EmployeeRepository employeeRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.employeeRepository = employeeRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Cria um novo funcionário.
     */
    @Override
    @Transactional
    public EmployeeDTO createEmployee(EmployeeDTO employeeDTO) {
        
        Employee employee = mapToEntity(employeeDTO);
        if(userRepository.existsByEmail(employee.getEmail())) {
            throw new RuntimeException("Erro: Este e-mail já está em uso!");
        }
        if (employeeRepository.existsByCpf(employee.getCpf())) {
            throw new RuntimeException("Erro: CPF já está em uso por outro usuário!");
        }

        try {
            Employee newEmployee = employeeRepository.save(employee);
            return mapToDTO(newEmployee);

        } catch (org.springframework.dao.DataIntegrityViolationException e) {
            throw new RuntimeException("Erro: O CPF ou E-mail informado já pertence a outro funcionário (verifique registros inativos)!");
        }
    }

    /**
     * Busca um funcionário pelo ID.
     */
    @Override
    @Transactional(readOnly = true)
    public EmployeeDTO getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(Objects.requireNonNull(id))
                .orElseThrow(() -> new ResourceNotFoundException("Funcionário não encontrado com id: " + id));
        
        return mapToDTO(employee);
    }

    /**
     * Retorna uma lista de TODOS os funcionários ATIVOS.
     */
    @Override
    @Transactional(readOnly = true)
    public List<EmployeeDTO> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAllByActiveTrue();
        
        return employees.stream()
                        .map(this::mapToDTO)
                        .collect(Collectors.toList());
    }

    /**
     * Atualiza um funcionário existente.
     */
    @Override
    @Transactional
    public EmployeeDTO updateEmployee(Long id, EmployeeDTO employeeDTO) {
        Employee employee = employeeRepository.findById(Objects.requireNonNull(id))
                .orElseThrow(() -> new ResourceNotFoundException("Funcionário não encontrado com id: " + id));

        Optional<User> userByEmail = userRepository.findByEmail(employeeDTO.getEmail());
        Optional<Employee> employeeByCpf = employeeRepository.findByCpf(employeeDTO.getCpf());

        if(userByEmail.isPresent() && !userByEmail.get().getId().equals(id)) {
            throw new RuntimeException("Erro: Email já está em uso por outro usuário!");
        } 
        if (employeeByCpf.isPresent() && !employeeByCpf.get().getId().equals(id)) {
            throw new RuntimeException("Erro: CPF já está em uso por outro usuário!");
        }

        employee.setName(employeeDTO.getName());
        employee.setEmail(employeeDTO.getEmail());
        employee.setCpf(employeeDTO.getCpf());
        employee.setPhone(employeeDTO.getPhone());
        employee.setBirthDate(employeeDTO.getBirthDate());
        employee.setWage(employeeDTO.getWage());
        employee.setActive(employeeDTO.isActive());

        if (employeeDTO.getPassword() != null && !employeeDTO.getPassword().isBlank()) {
            employee.setPassword(passwordEncoder.encode(employeeDTO.getPassword()));
        }

        try {
            Employee updatedEmployee = employeeRepository.save(employee);
            return mapToDTO(updatedEmployee);
        } catch (org.springframework.dao.DataIntegrityViolationException e) {
            throw new RuntimeException("Erro: O CPF ou E-mail informado já pertence a outro funcionário!");
        }
    }

    /**
     * Deleta um funcionário.
     */
    @Override
    @Transactional
    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(Objects.requireNonNull(id))
                .orElseThrow(() -> new ResourceNotFoundException("Funcionário não encontrado com id: " + id));

        employee.setActive(false);

        employeeRepository.save(employee);
    }
    /**
     * Converte Entidade para um DTO.
     */
    private EmployeeDTO mapToDTO(Employee employee) {
        EmployeeDTO dto = new EmployeeDTO();
        if (employee.getRole() != null) {
            dto.setRole(employee.getRole().toString());
        }
        dto.setId(employee.getId());
        dto.setName(employee.getName());
        dto.setEmail(employee.getEmail());
        dto.setCpf(employee.getCpf());
        dto.setPhone(employee.getPhone());
        dto.setBirthDate(employee.getBirthDate());
        dto.setWage(employee.getWage());
        dto.setActive(employee.isActive());
        return dto;
    }

    /**
     * Converte DTO para uma Entidade.
     */
    private Employee mapToEntity(EmployeeDTO dto) {
        Employee employee = new Employee();
        // O ID não é setado aqui, pois será gerado pelo banco
        employee.setName(dto.getName());
        employee.setEmail(dto.getEmail());
        employee.setCpf(dto.getCpf());
        employee.setPhone(dto.getPhone());
        employee.setBirthDate(dto.getBirthDate());
        employee.setWage(dto.getWage());
        employee.setActive(dto.isActive());
        
        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            employee.setPassword(passwordEncoder.encode(dto.getPassword()));
        } 
        return employee;
    }
}